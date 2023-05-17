import React from 'react'
import HeaderSection from '../src/section/HeaderSection'
import FooterSection from '../src/section/FooterSection'
import NavigationButton from '../src/component/form/elements/NavigationButton'

function NewAuth() {
  return (
    <>
      <HeaderSection showHeaderLine={true} />

      <main className="page auth">
        <div className="container">
          <div className="row">
            <div className="offset-lg-2 offset-xl-3 col-lg-8 col-xl-6 col-md-12">
              <div className="auth-wrapper new-auth">
                <div className="information">
                  <h1>[Azonosító igénylése]</h1>
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
                    [Azonosító kézbesítése]
                  </h2>
                  <div>
                    [Csak azok tudnak új kódot igényelni, akik már megkapták postai úton a levelet, de valamilyen oknál fogva elhagyták. Csak azok tudnak új kódot igényelni, akik már megkapták postai úton a levelet, de valamilyen oknál fogva elhagyták.]
                  </div>
                  <h2>
                    [E-mail cím megadása]
                  </h2>
                  <div>
                    [Ilyen és ilyen adatokat szükséges megadnod, mert ott fogunk tudni elérni és új kódot adni]
                  </div>
                  <h2>
                    [Lakcímkártya feltöltése]
                  </h2>
                  <div>
                    [Ügyelj arra, hogy jól látható, világos, homogén háttér előtti fényképet készíts. Csak a lakcímkártya elejét fotózd le! Csak a lakcímkártya szerepeljen rajta, olvashatóan az adataiddal.]
                  </div>
                  <h2>
                    [Megérkezik az új kódod]
                  </h2>
                  <div>
                    [A megadott e-mail címre 72 órán belül elküldjük az azonosító kódot, amivel szavazhatsz.]
                  </div>
                  <div className="button-wrapper">
                    <NavigationButton label="új azonosító igénylése" url="/lakcimkartya-feltoltes" />
                  </div>
                </div>
              </div>
            </div>
            <hr className="page-end-hr"/>
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  )
}

export default NewAuth
