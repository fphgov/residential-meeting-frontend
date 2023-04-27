import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import headerLogo from '../../public/image/bp-residential-header.svg'
import HamburgerMenu from '../component/HamburgerMenu'

function HeaderSection({ position, showHeaderLine = false }) {
  const router = useRouter()

  const [fixed, setFixed] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)

  const { asPath } = router

  const handleScroll = () => {
    if (window.scrollY >= (window.innerHeight > 767 ? 340 : 220)) {
      setFixed(true)
    } else {
      setFixed(false)
    }
  }

  const toggleMenu = () => {
    setOpenMenu(state => !state)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <header className={`site-header ${showHeaderLine ? 'header-line' : ''} ${fixed ? 'fixed-header' : ''} ${position ? 'relative-header' : ''}`}>
        <div className="container">
          <div className="site-header-inner">
            <div className="row flex-center">
              <div className="col-6 col-md-6 col-lg-6">
                <a className="logo" href="/">
                  <Image
                    src={headerLogo}
                    alt="Budapest Lakógyűlés logó"
                  />
                </a>
              </div>

              <div className="col-6 col-md-6 col-lg-6">
                <nav role="navigation" className="main-navigation">
                  <HamburgerMenu toggleMenu={toggleMenu} open={openMenu} />

                  <div className={`navigation-wrapper ${openMenu ? 'open' : ''}`}>
                    <ul className={openMenu ? 'container' : ''}>
                      <li><a href="https://lakogyules.budapest.hu" target="_blank" onClick={toggleMenu}><span>Főoldal</span></a></li>
                      <li><a href="https://lakogyules.budapest.hu/mi-a-lakogyules" target="_blank" onClick={toggleMenu}><span>Mi a lakógyűlés?</span></a></li>
                      <li><a href="https://lakogyules.budapest.hu/mi-a-lakogyules#dontsunk-kozosen-a-budapest-sorsat-befolyasolo-kerdesekben!" target="_blank" onClick={toggleMenu}><span>Kérdések</span></a></li>
                      <li><Link href="/szavazas" className={`${/^\/szavazas/.test(asPath) ? 'active' : ''}`} onClick={toggleMenu}><span>Szavazás</span></Link></li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>

          </div>
        </div>
      </header>
    </>
  )
}

export default HeaderSection
