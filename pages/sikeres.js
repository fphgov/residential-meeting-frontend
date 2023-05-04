import { useRef, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import HeaderSection from '../src/section/HeaderSection'
import FooterSection from '../src/section/FooterSection'
import StoreContext from '../src/StoreContext'

function SuccessPage() {
  const context = useContext(StoreContext)
  const router = useRouter()
  const linkRef = useRef()

  const form = context.storeGet('form')?.data

  useEffect(() => {
    if (! (form && form.auth_code)) {
      router.push('/azonositas')

      return
    }

    context.storeRemove('form')

    setTimeout(() => {
      linkRef.current.click()
    }, 6 * 1000)
  }, []);

  return (
    <>
      <HeaderSection />

      <main className="page success">
        <div className="container">
          <div className="row">
            <div className="offset-lg-2 col-lg-8 p-0">
              <div className="success-section">
                <div className="event-logo" />

                <h2>Szavazatod épp feldolgozásra kerül, hamarosan átirányítunk egy másik oldalra.</h2>

                <a ref={linkRef} href="http://lakogyules.budapest.hu/koszonjuk-hogy-szavaztal" rel="noopener noreferrer" style={{ display: 'inline-block' }} className="btn btn-primary btn-icon">
                  <div className="button-inner">
                    Tovább
                    <div className="icon" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </>
  )
}

export default SuccessPage
