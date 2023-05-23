import React from 'react'
import HeaderForgotSection from '../src/section/HeaderForgotSection'
import NavigationButton from '../src/component/form/elements/NavigationButton'

function InvalidToken() {

  return (
    <>
      <HeaderForgotSection showHeaderLine={true} />

      <main className="page auth lost-code-steps-page dark-bg-page">
        <div className="container">
          <div className="row">
            <div className="offset-lg-2 offset-xl-3 col-lg-8 col-xl-6 col-md-12">
              <div className="auth-wrapper">
                <div className="information">
                  <h1>Az e-mailben küldött link felhasználhatósága lejárt. Add le újra igényedet és erősítsd meg e-mail címedet!</h1>
                  <div className="d-flex justify-content-center mt-5">
                    <NavigationButton label="Azonosító igénylése" url="/elfelejtett-kod/igenyles" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default InvalidToken
