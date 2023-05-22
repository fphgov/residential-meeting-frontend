import React, { useEffect, useState, useContext } from 'react'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-v3'
import axios from "axios"
import StoreContext from '../src/StoreContext'
import HeaderSection from '../src/section/HeaderSection'
import Submit from "../src/component/form/elements/Submit"
import Dropdown from '../src/component/form/elements/DropdownInput'
import ScrollTo from "../src/component/common/ScrollTo"
import ErrorInfo from "../src/component/form/ErrorInfo"

function DistrictSelector() {
  const context = useContext(StoreContext)
  const router = useRouter()

  const { publicRuntimeConfig } = getConfig()

  const [loading, setLoading] = useState(false)
  const [recaptcha, setRecaptcha] = useState(null)
  const [recaptchaToken, setRecaptchaToken] = useState('')
  const [scroll, setScroll] = useState(false)
  const [error, setError] = useState(null)
  const [filterData, setFilterData] = useState({
    'district': '',
  })

  useEffect(() => {
    loadReCaptcha(publicRuntimeConfig.siteKey, (recaptchaToken) => {
      setRecaptchaToken(recaptchaToken)
    })
  }, [])

  const handleSelectInput = (e) => {
    setFilterData({ ...filterData, district: e.target.value })
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
      publicRuntimeConfig.apiCheckDistrict,
      new URLSearchParams(data).toString()
    )
      .then(response => {
        if (response.data) {
          router.push('/e-mail-cim-megadasa')
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
      <HeaderSection showHeaderLine={true} />

      <main className="page auth lost-code-steps-page district-selector-page">
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

                      <div className="input-wrapper">
                        <Dropdown
                          label="Kerület kiválasztása: *"
                          longInfo="Válaszd ki a lakcímkártyádon szereplő címed szerinti kerületet!"
                          onChange={handleSelectInput}
                          disabled={error && true}
                        />
                        {error && <ErrorInfo message={error} />}
                      </div>

                      <ReCaptcha
                        ref={ref => setRecaptcha(ref)}
                        sitekey={publicRuntimeConfig.siteKey}
                        action="submit"
                        verifyCallback={(recaptchaToken) => {
                          setRecaptchaToken(recaptchaToken)
                        }}
                      />
                      {!error ? <div className="submit-button-wrapper">
                        <Submit label="Tovább" loading={loading} disabled={!filterData.district} />
                        <a className="cancel-button" href="/">Mégsem</a>
                      </div> : <a className="mail-question-info" href="https://lakogyules.budapest.hu/mi-a-lakogyules#mikor-kapom-meg-a-levelem-az-egyeni-azonositommal" target="_blank">mikor kapom meg a levelem?</a>}
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

export default DistrictSelector
