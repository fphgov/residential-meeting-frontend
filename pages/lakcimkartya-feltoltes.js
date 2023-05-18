import React, { useEffect, useState, useContext } from 'react'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-v3'
import axios from "axios"
import Modal from 'react-modal'
import StoreContext from '../src/StoreContext'
import HeaderSection from '../src/section/HeaderSection'
import Submit  from "../src/component/form/elements/Submit"
import FileUpload from "../src/component/form/elements/FileUpload"
import Checkbox  from "../src/component/form/elements/Checkbox"
import ScrollTo from "../src/component/common/ScrollTo"
import Error  from "../src/component/form/Error"
import ErrorMiniWrapper from "../src/component/form/ErrorMiniWrapper"
import StaticImage  from "../src/component/common/StaticImage"
import { rmAllCharForEmail, rmAllCharForName } from '../src/lib/removeSpecialCharacters'

Modal.setAppElement('body');

function AddressCardPage() {
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
  const [ modalIsOpen, setIsOpen ] = React.useState(false)
  const [ filterData, setFilterData ] = useState({
    'token': 'dd',
    'media': null,
  })

  useEffect(() => {
    loadReCaptcha(publicRuntimeConfig.siteKey, (recaptchaToken) => {
      setRecaptchaToken(recaptchaToken)
    })
  }, [])

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  const clearErrorItem = (inputName) => {
    if (error && error[inputName]) {
      delete error[inputName]
    }
  }

  const ShowPrivacyError = ({ error }) => {
    if (! error) {
      return null
    }

    if (error?.newsletter?.callbackValue && error?.privacy?.callbackValue) {
      return <ErrorMiniWrapper error={error} id="privacy" className="error-message-single" />
    }

    if (error?.newsletter || error?.privacy) {
      return (
        <>
          <ErrorMiniWrapper error={error} id="newsletter" className="error-message-single" />
          <ErrorMiniWrapper error={error} id="privacy"  className="error-message-single" />
        </>
      )
    }
  }

  const handleChangeFileInput = (data) => {
    clearErrorItem('files')

    setFilterData({ ...filterData, media: data })
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
      publicRuntimeConfig.apiImageSend,
      new URLSearchParams(data).toString()
    )
    .then(response => {
      if (response.data) {
        router.push('/success')
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

      <main className="page auth">
        {scroll && document.querySelector('.error-message-inline') ? <ScrollTo element={document.querySelector('.error-message-inline').offsetTop} /> : null}

        <div className="container">
          <div className="row">
            <div className="offset-lg-2 offset-xl-3 col-lg-8 col-xl-6 col-md-12">
              <form className="form-horizontal" onSubmit={submitAuth}>
                <fieldset>
                  <div className="auth-wrapper">
                    <div className="information">
                      <h1>Új azonosító igénylése</h1>

                      <p>Amennyiben elhagyta a kódját, itt tud új azonosítót igényelni</p>
                    </div>

                    <div className="login-wrapper">
                      {error && !isClosed ? <Error message={error} /> : null}

                      <div className="input-wrapper">
                        <FileUpload 
                          id="address-card"
                          name="address-card"
                          label="Lakcím kártya feltöltése: *"
                          onChange={handleChangeFileInput}
                          longInfo="Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet."
                          acceptedExtensions={['.jpg', '.jpeg', '.png', '.heif', '.avif']}
                        />
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
                      <div className="button-wrapper">
                        <Submit label="Azonosító igénylése" loading={loading} disabled={!filterData.token || !filterData.media} />
                        <a className="cancel-button" href="/">Mégsem</a>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="Modal"
          overlayClassName="Overlay"
        >
          <div className="modal-content">
            <StaticImage src="level.png" width={320} height={320} alt="Kód a postai levél alján" priority={true} />
          </div>

          <div className="modal-navigation">
            <button onClick={closeModal}>Bezárás</button>
          </div>
        </Modal>
      </main>
    </>
  )
}

export default AddressCardPage
