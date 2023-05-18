import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'

import StoreContext from '../src/StoreContext'
import HeaderSection from '../src/section/HeaderSection'
import NavigationButton from '../src/component/form/elements/NavigationButton'

function InvalidLink() {
  const context = useContext(StoreContext)
  const router = useRouter()

  // const form = context.storeGet('form_code')?.data

  // useEffect(() => {
  //   if (! (form && form.token)) {
  //     router.push('/')

  //     return
  //   }

  //   context.storeRemove('form')
  // }, []);

  return (
    <>
      <HeaderSection showHeaderLine={true} />

      <main className="page auth lost-code-steps-page">

        <div className="container">
          <div className="row">
            <div className="offset-lg-2 offset-xl-3 col-lg-8 col-xl-6 col-md-12">
              <div className="auth-wrapper">
                <div className="information">
                  <h1>Ez a megerősítő link már nem érvényes!</h1>
                  <div className='d-flex justify-content-center mt-5'>
                  <NavigationButton label="azonosító igénylése" url="/azonositas"/>
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

export default InvalidLink
