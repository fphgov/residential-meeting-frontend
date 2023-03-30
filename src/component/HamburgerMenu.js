import React from 'react'

function HamburgerMenu({ toggleMenu, open }) {
  return (
    <>
      <div className="hamburger-menu-wrapper">
        <button className="hamburger-menu-toggle" aria-label={open ? "Menü bezárása" : "Menü megnyitása"} aria-expanded={open} tabIndex={0} onClick={toggleMenu}>
          <div className="hamburger-menu">
            <div className="hamburger-menu-elem" aria-hidden="true"></div>
            <div className="hamburger-menu-elem" aria-hidden="true"></div>
            <div className="hamburger-menu-elem" aria-hidden="true"></div>
          </div>

          <div className="hamburger-menu-title" aria-hidden="true">Menü</div>
        </button>
      </div>
    </>
  )
}

export default HamburgerMenu
