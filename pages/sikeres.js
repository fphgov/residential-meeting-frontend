import { useRef, useEffect, useContext } from 'react'
import HeaderSection from '../src/section/HeaderSection'
import FooterSection from '../src/section/FooterSection'
import StoreContext from '../../src/StoreContext'

function SuccessPage() {
  const context = useContext(StoreContext)
  const linkRef = useRef()

  const form = context.storeGet('form')?.data

  useEffect(() => {
    if (! (form && form.auth_code)) {
      router.push('/azonositas')
    }

    setTimeout(() => {
      context.storeRemove('form')
      linkRef.current.click()
    }, 2 * 1000)
  }, []);

  return (
    <>
      <HeaderSection />

      <main className="page page-success">
        <div className="container">
          <div className="row">
            <div className="offset-lg-2 col-lg-8 p-0">
              <div className="success-section">
                <div className="event-logo" />

                <h2>[Szavazatod épp feldolgozásra kerül, hamarosan átirányítunk egy másik oldalra.]</h2>

                <a ref={linkRef} href="#" rel="noopener noreferrer" className="btn btn-primary btn-small">Tovább</a>
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
