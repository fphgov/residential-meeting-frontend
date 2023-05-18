import React from 'react'
import HeaderSection from '../src/section/HeaderSection'
import FooterSection from '../src/section/FooterSection'
import NavigationButton from '../src/component/form/elements/NavigationButton'

function NewAuth() {
  return (
    <>
      <HeaderSection showHeaderLine={true} />

      <main className="page auth lost-code-steps-page">
        <div className="container">
          <div className="row">
            <div className="offset-lg-2 offset-xl-3 col-lg-8 col-xl-6 col-md-12">
              <div className="auth-wrapper new-auth">
                <div className="information">
                  <h1>Hogyan igényelhetem az egyedi azonosítómat?</h1>
                  <p>Ha elvesztetted vagy nem találod a leveledet, akkor is tudsz szavazni az első Budapesti Lakógyűlésen.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="new-auth middle-section-container">
          <div className="container">
            <div className="row">
              <div className="offset-lg-2 offset-xl-3 col-lg-8 col-xl-6 col-md-12">
                <div className="middle-section-wrapper">
                  <h2>
                    Azonosító kézbesítése
                  </h2>
                  <div>
                    Csak azok tudnak új kódot igényelni, akik már megkapták postai úton a levelet, de valamilyen oknál fogva elhagyták. Csak azok tudnak új kódot igényelni, akik már megkapták postai úton a levelet, de valamilyen oknál fogva elhagyták.
                  </div>
                  <h2>
                    E-mail cím megadása
                  </h2>
                  <div>
                    Add meg e-mail címedet, amire elküldhetjük a névre szóló egyedi azonosítódat. Miután megadtad az e-mail címedet, egy megerősítő levelet küldünk, ahol a kapott linkre kattintva folytathatod az azonosító igénylését
                  </div>
                  <h2>
                    Lakcímkártya előlapjának feltöltése
                  </h2>
                  <div>
                    Készíts egy képet a lakcímkártyád előlapjáról, vagy szkenneld, és töltsd fel a képet! (elfogadott formátumok: jpg, png, jpeg, HEIF, avif, webp)
                  </div>
                  <p><b>A képnél ügyelj arra, hogy:</b></p>
                  <div style={{ display: 'flex', gap: '18px', justifyContent: 'space-between' }}>
                    <div><div style={{ width: '125px', height: '125px', backgroundColor: '#D9D9D9' }}></div>ne tartalmazza a lakcímkártya hátoldalát</div>
                    <div><div style={{ width: '125px', height: '125px', backgroundColor: '#D9D9D9' }}></div>olvasható legyen minden adat a lakcímkártyán, fotózz fényes helyen!</div>
                    <div><div style={{ width: '125px', height: '125px', backgroundColor: '#D9D9D9' }}></div>használj egységes, homogén hátteret!</div>
                    <div><div style={{ width: '125px', height: '125px', backgroundColor: '#D9D9D9' }}></div>a képen csak a lakcímkártyád szerepeljen!</div>
                  </div>
                  <h2>
                    Feldolgozzuk az adataidat
                  </h2>
                  <div>
                    Ügyintézőink ellenőrzik a lakcímkártya fotóját és kikeresik az egyedi azonosítódat.
                  </div>
                  <h2>
                    Megérkezik az e-mail címed a kódod
                  </h2>
                  <div>
                    Az igényléstől számítva 3 munkanapon belül elküldjük részedre az egyedi azonosító kódodat, amivel már szavazhatsz is az első Budapesti Lakógyűlésen!
                  </div>
                  <div className="button-wrapper">
                    <NavigationButton label="új azonosító igénylése" url="/kerulet-valaszto" />
                  </div>
                </div>
              </div>
            </div>
            <hr className="page-end-hr" />
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  )
}

export default NewAuth
