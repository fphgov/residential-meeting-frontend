import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import headerLogo from '../../public/image/bp-residential-header.svg'
import HamburgerMenu from '../component/HamburgerMenu'

function HeaderSection({ position }) {
  const [fixed, setFixed] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)

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
      <header className={`site-header ${fixed ? 'fixed-header' : ''} ${position ? 'relative-header' : ''}`}>
        <div className="container">
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

                <ul className={openMenu ? 'open' : ''}>
                  <li><a href="/#" onClick={toggleMenu}><span>Főoldal</span></a></li>
                  <li><a href="/#" onClick={toggleMenu}><span>Mi a lakógyűlés?</span></a></li>
                  <li><a href="/#" onClick={toggleMenu}><span>Kérdések</span></a></li>
                  <li><Link href="/" onClick={toggleMenu}><span>Szavazás</span></Link></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default HeaderSection
