import React, { useEffect, useState, useContext } from 'react'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-v3'
import axios from "axios"
import Modal from 'react-modal'
import StoreContext from '../src/StoreContext'
import HeaderSection from '../src/section/HeaderSection'
import Submit from "../src/component/form/elements/Submit"
import FileUpload from "../src/component/form/elements/FileUpload"
import ScrollTo from "../src/component/common/ScrollTo"
import Error from "../src/component/form/Error"
import ErrorMiniWrapper from "../src/component/form/ErrorMiniWrapper"
import StaticImage from "../src/component/common/StaticImage"

Modal.setAppElement('body');

function AddressCardPage() {
  const context = useContext(StoreContext)
  const router = useRouter()

  const { publicRuntimeConfig } = getConfig()

  const [loading, setLoading] = useState(false)
  const [recaptcha, setRecaptcha] = useState(null)
  const [recaptchaToken, setRecaptchaToken] = useState('')
  const [scroll, setScroll] = useState(false)
  const [error, setError] = useState(null)
  const [isClosed, setIsClosed] = useState(false)
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const [filterData, setFilterData] = useState({
    'token': null,
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

  const handleChangeFileInput = (data) => {
    clearErrorItem('media')

    setFilterData({ ...filterData, media: data })
  }

  const submitAuth = (e) => {
    e.preventDefault()

    if (loading) {
      return
    }

    setScroll(false)
    setError(null)
    setLoading(true)

    let data = new FormData();
    data.append('token', filterData.token);
    data.append('media', filterData.media[0]);
    data.append('g-recaptcha-response',  recaptchaToken);

    context.storeSave('form_code', 'data', {token: filterData.token})

    axios.post(
      publicRuntimeConfig.apiImageSend,
      data
    )
      .then(response => {
        if (response.data) {
          router.push('/sikeres-igeny-bekuldese')
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
                      <h1>Egyedi azonosító igénylése</h1>
                      <p>Köszönjük, hogy megerősítetted e-mail címedet! Utolsó lépésként tölts fel egy lakcímkártyád előlapjáról készült képet, hogy azonosíthassunk.</p>
                    </div>

                    <div className="login-wrapper">
                      {error && !isClosed ? <Error message={error} /> : null}

                      <div className="input-wrapper">
                        <FileUpload
                          id="address-card"
                          name="address-card"
                          label="Lakcím kártya feltöltése: *"
                          onChange={handleChangeFileInput}
                          longInfo={`Készíts egy képet a lakcímkártyád előlapjáról vagy szkenneld be azt, és töltsd fel a képet! <a>Mire ügyelj a kép feltöltésénél?</a>`}
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
                      <div className="submit-button-wrapper">
                        <Submit label="Azonosító igénylése" loading={loading} disabled={!filterData.token || !filterData.media || !filterData.media.length} />
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
