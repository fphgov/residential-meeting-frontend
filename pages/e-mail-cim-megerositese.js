import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'

import StoreContext from '../src/StoreContext'
import HeaderForgotSection from '../src/section/HeaderForgotSection'

function VerifyEmail() {
  const context = useContext(StoreContext)
  const router = useRouter()

  const form = context.storeGet('form_code')?.data

  useEffect(() => {
    if (!(form && form.email)) {
      setTimeout(() => {
        router.push('/azonositas')
      }, 100)

      return
    }

    context.storeRemove('form_code')
  }, []);

  return (
    <>
      <HeaderForgotSection showHeaderLine={true} />

      <main className="page auth lost-code-steps-page dark-bg-page">
        <div className="container">
          <div className="row">
            <div className="offset-lg-2 offset-xl-3 col-lg-8 col-xl-6 col-md-12">
              <div className="auth-wrapper">
                <div className="information">
                  <h1>Erősítsd meg az e-mail címedet!</h1>
                  <p>Az általad megadott címre küldtünk egy levelet. Nyisd meg és kattints az abban található linkre, hogy ellenőrizhessük a cím valódiságát és folytathasd az igénylést!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default VerifyEmail
