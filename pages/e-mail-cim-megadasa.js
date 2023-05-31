import React, { useEffect, useState, useContext } from 'react'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-v3'
import axios from "axios"
import Modal from 'react-modal'
import StoreContext from '../src/StoreContext'
import HeaderForgotSection from '../src/section/HeaderForgotSection'
import Submit from "../src/component/form/elements/Submit"
import InputText from "../src/component/form/elements/InputText"
import Checkbox from "../src/component/form/elements/Checkbox"
import ScrollTo from "../src/component/common/ScrollTo"
import Error from "../src/component/form/Error"
import ErrorMiniWrapper from "../src/component/form/ErrorMiniWrapper"
import { rmAllCharForEmail, rmAllCharForName } from '../src/lib/removeSpecialCharacters'

Modal.setAppElement('body');

function EmailPage() {
  const context = useContext(StoreContext)
  const router = useRouter()

  const { publicRuntimeConfig } = getConfig()

  const [loading, setLoading] = useState(false)
  const [recaptcha, setRecaptcha] = useState(null)
  const [recaptchaToken, setRecaptchaToken] = useState('')
  const [scroll, setScroll] = useState(false)
  const [error, setError] = useState(null)
  const [filterData, setFilterData] = useState({
    'email': '',
    'privacy': false,
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

  const handleChangeEmailInput = (e) => {
    clearErrorItem(e.target.name)

    setFilterData({ ...filterData, [e.target.name]: rmAllCharForEmail(e.target.value) })
  }

  const handleChangeInput = (e) => {
    clearErrorItem(e.target.name)

    if (e.target.name === 'privacy' || e.target.name === 'newsletter') {
      clearErrorItem('privacy')
      clearErrorItem('newsletter')
    }

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

    context.storeSave('form_code', 'data', filterData)

    axios.post(
      publicRuntimeConfig.apiEmailRequest,
      new URLSearchParams(data).toString()
    )
      .then(response => {
        if (response.data) {
          router.push('/e-mail-cim-megerositese')
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 403) {
          setError('Google reCapcha ellenőrzés sikertelen. Kérjük frissíts rá az oldalra.')
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
      <HeaderForgotSection showHeaderLine={true} />

      <main className="page auth lost-code-steps-page">
        {scroll && document.querySelector('.error-message-inline') ? <ScrollTo element={document.querySelector('.error-message-inline').offsetTop} /> : null}

        <div className="container">
          <div className="row">
            <div className="offset-lg-2 offset-xl-3 col-lg-8 col-xl-6 col-md-12">
              <form className="form-horizontal" onSubmit={submitAuth}>
                <fieldset>
                  <div className="auth-wrapper">
                    <div className="information">
                      <h1>Egyedi azonosító igénylése</h1>
                    </div>

                    <div className="login-wrapper">
                      {error && <Error message={error} />}
                      <div className="input-wrapper">
                        <InputText
                          id="email"
                          name="email"
                          label="E-mail cím megadása:"
                          placeholder="Ide írd az e-mail címedet"
                          value={filterData.email}
                          onChange={handleChangeEmailInput}
                          aria-invalid={error && error['email'] ? true : false}
                          aria-required={false}
                          longInfo={
                            <>Add meg azt az e-mail címet, amire elküldhetjük a megerősítő linket és a kódodat.</>
                          }
                          info={null}
                        />

                        <ErrorMiniWrapper error={error} id="email" />
                      </div>

                      <>
                        <div className="input-wrapper form-control" style={{marginBottom: '6px'}}>
                          <Checkbox id="privacy" name="privacy" value={filterData.privacy} onChange={handleChangeInput} ariaInvalid={error && error['privacy'] ? true : false} ariaRequired={true}>
                            Elolvastam az <a href={`${publicRuntimeConfig.publicHost}/files/adatkezelesi_tajekoztato.pdf`} target="_blank" rel="noopener noreferrer">adatkezelési tájékoztatást</a>, és az abban foglaltakat tudomásul vettem.
                          </Checkbox>
                        </div>
                        <ErrorMiniWrapper error={error} id="privacy" />
                      </>

                      <hr />

                      <ReCaptcha
                        ref={ref => setRecaptcha(ref)}
                        sitekey={publicRuntimeConfig.siteKey}
                        action="submit"
                        verifyCallback={(recaptchaToken) => {
                          setRecaptchaToken(recaptchaToken)
                        }}
                      />

                      <div className="submit-button-wrapper">
                        <Submit label="Megerősítés" loading={loading} disabled={!filterData.email} />
                        <a className="cancel-button" href="/">Mégse</a>
                      </div>
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

export default EmailPage
