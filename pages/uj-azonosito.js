import React from 'react'
import HeaderSection from '../src/section/HeaderSection'
import FooterSection from '../src/section/FooterSection'
import NavigationButton from '../src/component/form/elements/NavigationButton'
import IconWithHeadline from '../src/component/IconWithHeadline'
import IconNotes from '../public/image/icon-notes.svg'
import IconEmail from '../public/image/icon-email.svg'
import IconIdCard from '../public/image/icon-id-card.svg'
import IconTime from '../public/image/icon-time.svg'
import IconNumbers from '../public/image/icon-numbers.svg'


function NewAuth() {
  return (
    <>
      <HeaderSection showHeaderLine={true} />

      <main className="page auth lost-code-steps-page">
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
                  <IconWithHeadline headlineText="Bejelentett lakcímed kerületének megadása" icon={IconNotes} />
                  <div>
                    Azok a városlakók tudják online megigényelni az egyedi azonosítójukat, akiknek a kerületében már befejeződött a terjesztés.
                  </div>
                  <div className='blue-label-info-box'>
                    <p className='headline'>Ellenőrizd, hogy a bejelentett lakcímed kerületében mikorra várható az utolsó levél érkezése! </p>
                    <div><b>A levelek terjesztése befejeződött az alábbi kerületekben:</b> I., V., VI.</div>
                    <div><b>A levelek terjesztése jelenleg folyamatban van az alábbi kerületekben:</b> III., IV., VII., VIII., IX., X., XI., XII., XIII.</div>
                    <div><b>A terjesztés várható időtartama a kerületekben:</b></div>
                    <ul>
                      <li>II., XIV., XV. kerület: 2023. május 19-29.</li>
                      <li>XVI., XVII. kerület: 2023. május 24. - június 3.</li>
                      <li>XVIII., XIX., XX., XXI., XXII., XXIII. kerület: 2023. május 26. - június 5.</li>
                    </ul>
                  </div>
                  <IconWithHeadline headlineText="E-mail cím megadása" icon={IconEmail} />
                  <div>
                    Add meg e-mail címedet, amire elküldhetjük a névre szóló egyedi azonosítódat. Miután megadtad az e-mail címedet, egy megerősítő levelet küldünk, ahol a kapott linkre kattintva folytathatod az azonosító igénylését.
                  </div>
                  <IconWithHeadline headlineText="Lakcímkártya előlapjának feltöltése" icon={IconIdCard} />
                  <div>
                    Készíts egy képet a lakcímkártyád előlapjáról, vagy szkenneld, és töltsd fel a képet! A lakcímkártya előlapján található a név és a lakcím. <b>Elfogadott kiterjesztés:</b> jpg, png, jpeg, heif, avif. <b>Max. méret:</b> 15 MB.
                  </div>
                  <p><b>A képnél ügyelj arra, hogy:</b></p>
                  <div style={{ display: 'flex', gap: '14px', justifyContent: 'space-between' }}>
                    <div><div style={{ width: '195px', height: '195px', backgroundColor: '#D9D9D9' }}></div>ne tartalmazza a lakcímkártya hátoldalát</div>
                    <div><div style={{ width: '195px', height: '195px', backgroundColor: '#D9D9D9' }}></div>olvasható legyen minden adat a lakcímkártyán, fotózz fényes helyen!</div>
                    <div><div style={{ width: '195px', height: '195px', backgroundColor: '#D9D9D9' }}></div>használj egységes, homogén hátteret!</div>
                    <div><div style={{ width: '195px', height: '195px', backgroundColor: '#D9D9D9' }}></div>a képen csak a lakcímkártyád szerepeljen!</div>
                  </div>
                  <IconWithHeadline headlineText="Feldolgozzuk az adataidat" icon={IconTime} />
                  <div>
                    Ügyintézőink ellenőrzik a lakcímkártya fotóját és kikeresik az egyedi azonosítódat.
                  </div>
                  <IconWithHeadline headlineText="Megérkezik az e-mail címed a kódod" icon={IconNumbers} />
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
