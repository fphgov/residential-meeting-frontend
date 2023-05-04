import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import StoreContext from '../../src/StoreContext'
import headerLogo from '../../public/image/bp-residential-header.svg'
import HamburgerMenu from '../component/HamburgerMenu'

function HeaderSection({ position, showHeaderLine = false }) {
  const context = useContext(StoreContext)
  const router = useRouter()

  const { asPath } = router

  const form = context.storeGet('form')

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

  const toAuthPage = (e) => {
    e.preventDefault()

    setOpenMenu(false)

    if (form && form.data) {
      if (window.confirm("A korábban kitöltött adatok törlése kerülnek a böngészőből. Biztos megszakítod a szavazást?")) {
        context.storeRemove('form')

        router.push('/azonositas')

        return
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <header className={`site-header${showHeaderLine ? ' header-line' : ''}${fixed ? ' fixed-header' : ''}${position ? 'relative-header' : ''}${asPath === '/azonositas' ? ' transparent-header' : ''}`}>
        <div className="container">
          <div className="site-header-inner">
            <div className="row flex-center">
              <div className="col-10 col-sm-8 col-md-8 col-lg-6">
                <a className="logo" href="/">
                  <Image
                    src={headerLogo}
                    alt="Budapest Lakógyűlés logó"
                  />
                </a>
              </div>

              <div className="col-2 col-sm-4 col-md-4 col-lg-6">
                <nav role="navigation" className="main-navigation">
                  <HamburgerMenu toggleMenu={toggleMenu} open={openMenu} />

                  <div className={`navigation-wrapper ${openMenu ? 'open' : ''}`}>
                    <ul className={openMenu ? 'container' : ''}>
                      <li><a href="https://lakogyules.budapest.hu" target="_blank" onClick={() => { setOpenMenu(false) }}><span>Vissza a főoldalra</span></a></li>
                      <li><a href="/azonositas" onClick={toAuthPage}><span>Szavazás megszakítása</span></a></li>
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
