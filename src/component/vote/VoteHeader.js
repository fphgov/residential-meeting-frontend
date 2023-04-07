import React from "react"
import {
  Link,
} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons"
import Logo from '../img/kozossegi_koltsegvetes.svg'

export default function VoteHeader({ children }) {
  return (
    <header className="vote-header">
      <nav className="main-navigation">
        <div className="container-fluid">
          <div className="row flex-center">
            <div className="col-xs-6 col-sm-6 col-md-2">
              <div className="logo-wrapper">
                <a href="/" rel="noopener noreferrer" onClick={() => { sessionStorage.removeItem('page') }}>
                  <img src={Logo} alt="Budapest Közösségi Költségvetés" />
                </a>
              </div>
            </div>

            <div className="col-xs-6 col-sm-6 col-md-10">
              <ul className="desktop-menu">
                <li><Link to={'/'}>Kilépés a szavazásból <FontAwesomeIcon icon={faArrowCircleRight} /></Link></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {children}
    </header>
  )
}
