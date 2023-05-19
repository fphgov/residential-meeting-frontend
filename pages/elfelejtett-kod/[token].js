import React, { useEffect, useState, useContext } from 'react'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-v3'
import axios from "axios"
import Modal from 'react-modal'
import StoreContext from '../../src/StoreContext'
import HeaderSection from '../../src/section/HeaderSection'
import Submit from "../../src/component/form/elements/Submit"
import FileUpload from "../../src/component/form/elements/FileUpload"
import ScrollTo from "../../src/component/common/ScrollTo"
import Error from "../../src/component/form/Error"

Modal.setAppElement('body');

function AddressCardPage() {
  const context = useContext(StoreContext)
  const router = useRouter()
  const { token } = router.query;

  const { publicRuntimeConfig } = getConfig()

  const [loading, setLoading] = useState(false)
  const [recaptcha, setRecaptcha] = useState(null)
  const [recaptchaToken, setRecaptchaToken] = useState('')
  const [scroll, setScroll] = useState(false)
  const [error, setError] = useState(null)
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

  useEffect(() => {
    async function fetchTokenData() {
      if (token) {
        const isTokenValid = await checkToken(token)
        if (isTokenValid) {
          setFilterData({ ...filterData, token: token })
        } else {
          router.push('/ervenytelen-link')
        }
      }
    }

    fetchTokenData()
  }, [token]);

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

  const checkToken = async (token) => {
    let data = new FormData();
    data.append('token', token);

    try {
      await axios.post(
        publicRuntimeConfig.apiCheckToken,
        data
      )
      return true
    } catch {
      return false
    }
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
    data.append('g-recaptcha-response', recaptchaToken);

    context.storeSave('form_code', 'data', { token: filterData.token })

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
                      <p>Köszönjük, hogy megerősítetted e-mail címedet! Utolsó lépésként tölts fel egy lakcímkártyád előlapjáról készült képet, hogy azonosíthassunk.</p>
                    </div>

                    <div className="login-wrapper">
                      {error && <Error message={error} />}

                      <div className="input-wrapper">
                        <FileUpload
                          id="address-card"
                          name="address-card"
                          label="Lakcím kártya feltöltése: *"
                          onChange={handleChangeFileInput}
                          longInfo="Készíts egy képet a lakcímkártyád előlapjáról vagy szkenneld be azt, és töltsd fel a képet! "
                          linkText="Mire ügyelj a kép feltöltésénél?"
                          onLinkClick={openModal}
                          acceptedExtensions={['.jpg', '.jpeg', '.png', '.heif', '.avif']}
                          additionalHtml="<div>Elfogadott kiterjesztés: jpg, png, jpeg, heif, avif</div><div>Max. méret: 15 MB.</div>"
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
          className="Text-Modal"
          overlayClassName="Overlay"
        >
          <div className="text-modal-content">
            <h2>Mire ügyelj a kép feltöltésénél?</h2>
            <ul>
              <li>olvasható legyen minden adat a lakcímkártyán, fotózz fényes helyen!</li>
              <li>használj egységes, homogén hátteret!</li>
              <li>a képen csak a lakcímkártyád szerepeljen!</li>
              <li>Az igényedet csak abban az esetben tudjuk befogadni, ha a fenti pontoknak megfelel a lakcímkártya képe.</li>
            </ul>
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
