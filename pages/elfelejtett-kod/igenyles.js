import React from 'react'
import HeaderForgotSection from '../../src/section/HeaderForgotSection'
import FooterSection from '../../src/section/FooterSection'
import NavigationButton from '../../src/component/form/elements/NavigationButton'
import NumberWithHeadline from '../../src/component/NumberWithHeadline'
import StaticImage from "../../src/component/common/StaticImage"

function NewAuth() {
  return (
    <>
      <HeaderForgotSection showHeaderLine={true} />

      <main className="page auth lost-code-steps-page new-auth">
        <div className="container">
          <div className="row">
            <div className="offset-xl-2 col-xl-8 col-lg-12">
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
              <div className="offset-xl-2 col-xl-8 col-lg-12">
                <div className="middle-section-wrapper">
                  <div className="middle-section-point-wrapper">
                    <NumberWithHeadline headlineText="E-mail cím megadása" number={1} />
                    <div>
                      Add meg e-mail címedet, amire elküldhetjük a névre szóló egyedi azonosítódat. Miután megadtad az e-mail címedet, egy megerősítő levelet küldünk, ahol a kapott linkre kattintva folytathatod az azonosító igénylését.
                    </div>
                  </div>
                  <div className="middle-section-point-wrapper">
                    <NumberWithHeadline headlineText="Lakcímkártya előlapjának feltöltése" number={2} />
                    <div>
                      Készíts egy képet a lakcímkártyád előlapjáról, vagy szkenneld, és töltsd fel a képet! A lakcímkártya előlapján található a név és a lakcím. <b>Elfogadott kiterjesztés:</b> jpg, png, jpeg, heif, avif. <b>Max. méret:</b> 15 MB.
                    </div>
                    <p className="larger-text small-screen-align-center"><b>A képnél ügyelj arra, hogy:</b></p>
                    <div className="static-image-thumbnail-wrapper">
                      <div className="static-image-thumbnail">
                        <StaticImage src="instruction-1.png" width={187} height={230} alt="ne tartalmazza a lakcímkártya hátoldalát" priority={false} />
                        ne tartalmazza a lakcímkártya hátoldalát
                      </div>

                      <div className="static-image-thumbnail">
                        <StaticImage src="instruction-2.png" width={187} height={230} alt="olvasható legyen minden adat a lakcímkártyán, fotózz fényes helyen!" priority={false} />
                        olvasható legyen minden adat a lakcímkártyán, fotózz fényes helyen!
                      </div>

                      <div className="static-image-thumbnail">
                        <StaticImage src="instruction-3.png" width={187} height={230} alt="használj egységes, homogén hátteret!" priority={false} />
                        használj egységes, homogén hátteret!
                      </div>

                      <div className="static-image-thumbnail">
                        <StaticImage src="instruction-4.png" width={187} height={230} alt="a képen csak a lakcímkártyád szerepeljen!" priority={false} />
                        a képen csak a lakcímkártyád szerepeljen!
                      </div>
                    </div>
                    <p className="larger-text mt-5"><b>Az igényedet csak abban az esetben tudjuk befogadni, ha a fenti pontoknak megfelel a lakcímkártya képe! Elutasítás esetén e-mail-ben értesítünk és újra leadhatod az igényedet.</b></p>
                  </div>
                  <div className="middle-section-point-wrapper">
                    <NumberWithHeadline headlineText="Feldolgozzuk az adataidat" number={3} />
                    <div>
                      Ügyintézőink ellenőrzik a lakcímkártya fotóját és kikeresik az egyedi azonosítódat.
                    </div>
                  </div>
                  <div className="middle-section-point-wrapper">
                    <NumberWithHeadline headlineText="Megérkezik a kódod az e-mail fiókodba" number={4} />
                    <div>
                      Az igényléstől számítva 3 munkanapon belül elküldjük részedre az egyedi azonosító kódodat, amivel már szavazhatsz is az első Budapesti Lakógyűlésen!
                    </div>
                  </div>

                  <div className="button-wrapper">
                    <NavigationButton label="Egyedi azonosító igénylése" url="/e-mail-cim-megadasa" />
                  </div>

                  <p>Ha kérdésed van, a <a href="https://lakogyules.budapest.hu/mi-a-lakogyules" target="_blank">Mi a lakógyűlés?</a> oldalon tájékozódhatsz vagy keresd munkatársainkat a +36-1-900-0668 telefonszámon minden hétköznap 9:00 és 18:00 között, vagy az <a href="mailto:info.lakogyules@budapest.hu">info.lakogyules@budapest.hu</a> email-címen!</p>
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
