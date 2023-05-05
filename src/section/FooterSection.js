import Image from 'next/image'
import getConfig from 'next/config'
import bpLogo from '../../public/image/bp-logo.svg'

function FooterSection() {
    const { publicRuntimeConfig } = getConfig()

    return (
      <>
        <footer className="main">
          <div className="container">
            <div className="line-one">
              <div className="logo-wrapper">
                <Image
                  src={bpLogo}
                  alt="Budapest logó"
                />
              </div>
            </div>

            <div className="copyright-wrapper">
              <div className="row flex_center">
                <div className="col-md-12 col-lg-5">
                  <div className="copyright">
                    © 2023 Budapest Főváros Önkormányzata | Minden jog fenntartva
                  </div>
                </div>

                <div className="col-md-12 col-lg-7">
                  <ul className="footer-menu">
                    <li><a href={`${publicRuntimeConfig.publicHost}/files/adatkezelesi_tajekoztato.pdf`} target="_blank" rel="noopener noreferrer">Adatkezelési tájékoztató</a></li>
                    <li><a href="#" target="_blank" rel="noopener noreferrer">Süti tájékoztató</a></li>
                    <li><a aria-label="Sütikezelés" data-cc="c-settings">Sütikezelés</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </>
    )
}

export default FooterSection
