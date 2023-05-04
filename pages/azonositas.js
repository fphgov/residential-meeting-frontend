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
  const [ showPrivacy, setShowPrivacy ] = useState(false)
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

  useEffect(() => {
    if (filterData.email !== '') {
      setShowPrivacy(true)
    } else {
      setShowPrivacy(false)
    }
  }, [filterData])

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
                      <h1>Szavazás</h1>

                      <p>Döntsünk közösen, szavazz egyedi kódoddal az első Budapesti Lakógyűlésen június 11-ig!</p>
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
                          longInfo={
                            <>A kódodat a Fővárosi Önkormányzat által küldött névre szóló postai levél tetején találod. Az adatkezelési tájékoztatót <a href={`${publicRuntimeConfig.publicHost}/adatvedelmi_tajekozato.pdf`} target="_blank" rel="noopener noreferrer">itt éred el</a>.</>
                          }
                          info={null}
                        />

                        <ErrorMiniWrapper error={error} id="auth_code" />
                      </div>

                      <div className="input-wrapper">
                        <InputText
                          id="email"
                          name="email"
                          label="E-mail cím (nem kötelező):"
                          placeholder="minta.janos@budapest.hu"
                          value={filterData.email}
                          onChange={handleChangeEmailInput}
                          aria-invalid={error && error['email'] ? true: false}
                          aria-required={false}
                          longInfo={
                            <>Ha azt szeretnéd, hogy külön is értesítsünk a szavazás sikerességéről és a Lakógyűlés eredményéről, akkor add meg az e-mail címedet.</>
                          }
                          info={null}
                        />

                        <ErrorMiniWrapper error={error} id="email" />
                      </div>

                      { showPrivacy ? <>
                        <div className="input-wrapper form-control">
                          <Checkbox id="privacy" name="privacy" value={filterData.privacy} onChange={handleChangeInput} ariaInvalid={error && error['privacy'] ? true: false} ariaRequired={true}>
                            Szeretnék külön értesítést kapni a szavazásom sikerességéről és a Lakógyűlés eredményéről. Az <a href={`${publicRuntimeConfig.publicHost}/adatvedelmi_tajekozato.pdf`} target="_blank" rel="noopener noreferrer">adatkezelési tájékoztatást</a> megismertem, és hozzájárulok, hogy e célból kezeljék az e-mail címemet.
                          </Checkbox>

                          <ErrorMiniWrapper error={error} id="privacy" />
                        </div>

                        <div className="input-wrapper form-control">
                          <Checkbox id="newsletter" name="newsletter" value={filterData.newsletter} onChange={handleChangeInput} ariaInvalid={error && error['newsletter'] ? true: false} ariaRequired={false}>
                            Szeretnék feliratkozni a Fővárosi Önkormányzat Hírlevelére. Az <a href={`${publicRuntimeConfig.publicHost}/adatvedelmi_tajekozato.pdf`} target="_blank" rel="noopener noreferrer">adatkezelési tájékoztatást</a> megismertem, és hozzájárulok, hogy e célból kezeljék az e-mail címemet.
                          </Checkbox>

                          <ErrorMiniWrapper error={error} id="newsletter" />
                        </div>
                      </> : null}

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
