import Image from 'next/image'
import Link from 'next/link'
import bpLogo from '../../public/image/bp-logo.svg'

function FooterSection() {
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
                <div className="col-md-12 col-lg-6">
                  <div className="copyright">
                    © 2023 Budapest Főváros Önkormányzata | Minden jog fenntartva
                  </div>
                </div>

                <div className="col-md-12 col-lg-6">
                  <ul className="footer-menu">
                    <li><Link href="/impresszum">Impresszum</Link></li>
                    <li><Link href="/kapcsolat">Kapcsolat</Link></li>
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
