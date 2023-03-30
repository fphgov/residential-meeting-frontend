import HeaderSection from '../src/section/HeaderSection'
import FooterSection from '../src/section/FooterSection'

function ImpressumPage() {
  return (
    <>
      <HeaderSection position={true} />

      <div className="page">
        <div className="container">
          <h1>Impresszum</h1>

          <p>
            A Budapest Lakógyűlés Budapest Főváros Önkormányzatának tematikus aloldala.<br />
            Felelős kiadó: Főpolgármesteri Hivatal, Főpolgármesteri Iroda
          </p>

          <p>Szerkesztő: Balogh Samu Márton kabinetfőnök</p>

          <p>
            1052 Budapest Városház utca 9-11.<br />
            Postacím: 1840 Budapest<br />
            Telefon: <a href="tel:3613271038">+36 1 327 1038</a><br />
            Email-cím: <a href="mailto:ugyfelszolgalat@budapest.hu">ugyfelszolgalat@budapest.hu</a>
          </p>
        </div>
      </div>

      <FooterSection />
    </>
  )
}

export default ImpressumPage
