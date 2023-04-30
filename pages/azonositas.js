import React, { useEffect, useState, useContext } from 'react'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-v3'
import axios from "axios"
import StoreContext from '../src/StoreContext'
import HeaderSection from '../src/section/HeaderSection'
import Submit  from "../src/component/form/elements/Submit"
import CodeInput  from "../src/component/form/elements/CodeInput"
import InputText  from "../src/component/form/elements/InputText"
import Checkbox  from "../src/component/form/elements/Checkbox"
import ScrollTo from "../src/component/common/ScrollTo"
import Error  from "../src/component/form/Error"
import ErrorMiniWrapper from "../src/component/form/ErrorMiniWrapper"
import { rmAllCharForEmail, rmAllCharForName } from '../src/lib/removeSpecialCharacters'

function AuthPage() {
  const context = useContext(StoreContext)
  const router = useRouter()

  const { publicRuntimeConfig } = getConfig()

  const [ loading, setLoading ] = useState(false)
  const [ recaptcha, setRecaptcha ] = useState(null)
  const [ recaptchaToken, setRecaptchaToken ] = useState('')
  const [ scroll, setScroll ] = useState(false)
  const [ error, setError ] = useState(null)
  const [ isClosed, setIsClosed ] = useState(false)
  const [ filterData, setFilterData ] = useState({
    'auth_code': '',
    'email': '',
    'privacy': false,
    'newsletter': false,
  })

  useEffect(() => {
    loadReCaptcha(publicRuntimeConfig.siteKey, (recaptchaToken) => {
      setRecaptchaToken(recaptchaToken)
    })
  }, [])

  const clearErrorItem = (inputName) => {
    if (error && error[inputName]) {
      delete error[inputName]
    }
  }

  const handleChangeRaw = (e) => {
    clearErrorItem(e.target.name)

    setFilterData({ ...filterData, [e.target.name]: e.target.value })
  }

  const handleChangeEmailInput = (e) => {
    clearErrorItem(e.target.name)

    setFilterData({ ...filterData, [e.target.name]: rmAllCharForEmail(e.target.value) })
  }

  const handleChangeInput = (e) => {
    clearErrorItem(e.target.name)

    const value = e.target.type === 'checkbox' ? e.target.checked : rmAllCharForName(e.target.value)

    setFilterData({ ...filterData, [e.target.name]: value })
  }

  const submitAuth = (e) => {
    e.preventDefault()

    if (loading) {
      return
    }

    setScroll(false)
    setError(null)
    setLoading(true)

    const data = {
      ...filterData,
      'g-recaptcha-response': recaptchaToken,
    }

    context.storeSave('form', 'data', filterData)

    axios.post(
      publicRuntimeConfig.apiAuth,
      new URLSearchParams(data).toString()
    )
    .then(response => {
      if (response.data) {
        router.push('/kerdes/1')
      }
    })
    .catch(error => {
      if (error.response && error.response.status === 403) {
        setError('Google reCapcha ellenőrzés sikertelen')
        setScroll(true)
      } else if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error)
        setScroll(true)
      } else if (error.response && error.response.data && error.response.data.errors) {
        setError(error.response.data.errors)
        setScroll(true)
      } else {
        setError('Váratlan hiba történt, kérünk próbáld később')
        setScroll(true)
      }

      recaptcha.execute()
    })
    .finally(() => {
      setLoading(false)
    })
  }

  return (
    <>
      <HeaderSection showHeaderLine={true} />

      <main className="page auth">
        {scroll && document.querySelector('.error-message-inline') ? <ScrollTo element={document.querySelector('.error-message-inline').offsetTop} /> : null}

        <div className="container">
          <div className="row">
            <div className="offset-lg-3 col-lg-6 col-md-12">
              <form className="form-horizontal" onSubmit={submitAuth}>
                <fieldset>
                  <div className="auth-wrapper">
                    <div className="information">
                      <h1>[Azonosítás]</h1>

                      <p>[Itt tudod magad azonosító ahhoz, hogy leadhasd a szavazatod. Az azonosítót a levél ezen részén találod.]</p>
                    </div>

                    <div className="login-wrapper">
                      {error && !isClosed ? <Error message={error} /> : null}

                      <div className="input-wrapper">
                        <CodeInput
                          id="auth_code"
                          name="auth_code"
                          label="Egyedi azonosító kód: *"
                          placeholder="LGY-0000-AAAA"
                          value={filterData.auth_code}
                          defaultValue={filterData.auth_code}
                          onChange={handleChangeRaw}
                          ariaInvalid={error && error['auth_code'] ? true: false}
                          ariaRequired={true}
                          info="Ide kerül segítő információ az adott mezőre vonatkozólag"
                        />

                        <ErrorMiniWrapper error={error} id="auth_code" />
                      </div>

                      <div className="input-wrapper">
                        <InputText
                          id="email"
                          name="email"
                          label="E-mail cím: (opcionális)"
                          placeholder="minta.janos@budapest.hu"
                          value={filterData.email}
                          onChange={handleChangeEmailInput}
                          aria-invalid={error && error['email'] ? true: false}
                          aria-required={false}
                          info="Ide kerül segítő információ az adott mezőre vonatkozólag"
                        />

                        <ErrorMiniWrapper error={error} id="email" />
                      </div>

                      <div className="input-wrapper form-control">
                        <Checkbox id="privacy" name="privacy" value={filterData.privacy} onChange={handleChangeInput} ariaInvalid={error && error['privacy'] ? true: false} ariaRequired={true}>
                          Elolvastam és elfogadom az <a href={`${publicRuntimeConfig.publicHost}/adatvedelmi_tajekozato.pdf`} target="_blank" rel="noopener noreferrer">adatkezelési tájékoztatót</a>. *
                        </Checkbox>

                        <ErrorMiniWrapper error={error} id="privacy" />
                      </div>

                      <div className="input-wrapper form-control">
                        <Checkbox id="newsletter" name="newsletter" value={filterData.newsletter} onChange={handleChangeInput} ariaInvalid={error && error['newsletter'] ? true: false} ariaRequired={false}>
                          Szeretnék feliratkozni a hírlevélre, elolvastam és elfogadom a <a href="https://budapest.hu/Documents/adatkezelesi_tajekoztatok/Fovarosi_Onkormanyzat_hirlevele.pdf" target="_blank" rel="noopener noreferrer">hírlevélre vonatkozó adatkezelési tájékoztatót</a>. (opcionális)
                        </Checkbox>

                        <ErrorMiniWrapper error={error} id="newsletter" />
                      </div>

                      <hr />

                      <ReCaptcha
                        ref={ref => setRecaptcha(ref)}
                        sitekey={publicRuntimeConfig.siteKey}
                        action="submit"
                        verifyCallback={(recaptchaToken) => {
                          setRecaptchaToken(recaptchaToken)
                        }}
                      />

                      <Submit label="Tovább a szavazáshoz" loading={loading} />
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default AuthPage
