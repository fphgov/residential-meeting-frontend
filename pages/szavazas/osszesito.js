import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import StoreContext from '../../src/StoreContext'
import HeaderSection from '../../src/section/HeaderSection'
import FooterSection from '../../src/section/FooterSection'
import VoteNavigation from '../../src/component/VoteNavigation'
import VoteOverviewItem from '../../src/component/VoteOverviewItem'

function QuestionPage() {
  const context = useContext(StoreContext)
  const router = useRouter()

  const [ answer, setAnswer ] = useState(null)

  const { id } = router.query

  const form = context.storeGet('form')

  const handleChange = (e) => {
    setAnswer(e)
  }

  useEffect(() => {
    if (! (form && form.data && form.data.auth_code)) {
      router.push('/szavazas/azonositas')
    }
  }, []);

  useEffect(() => {
    form.data[`question_${id}`] = answer

    context.storeSave('form', 'data', form.data)
  }, [answer]);

  return (
    <>
      <HeaderSection />

      <main className="page">
        <VoteNavigation list={[
          { id: 1, label: 'Lánchíd forgalma' },
          { id: 2, label: '[Kérdés témája 2]' },
          { id: 3, label: '[Kérdés témája 3]' },
          { id: 4, label: '[Kérdés témája 4]' },
        ]} />

        <div className="vote-section">
          <div className="container">
            <div className="row">
              <div className="offset-lg-2 col-lg-8">
                <h1>[Itt láthatod a leadott szavazatodat a témakörökben. Még lehetőséged van visszamenni módosítani, ha szeretnél!]</h1>

                <div className="button-wrapper">
                  <button type="button" className="btn btn-primary">Leadom a szavazatomat</button>
                  <button type="button" className="btn btn-secondary">Áttekintés</button>
                </div>

                <div className="overview">
                  <VoteOverviewItem
                    id={1}
                    label="1. [Kérdés témája 1 nevű kérdés, biztos hogy hosszabb vagy több soros lesz, de törekedjünk a tömör, lényegretörő megfogalmazásra.]"
                    answer="Igen, mert szerintem is így vagy úgy kellene működnie, ezzel értek egyet."
                  />

                  <VoteOverviewItem
                    id={2}
                    label="2. [Kérdés témája 2 nevű kérdés, biztos hogy hosszabb vagy több soros lesz, de törekedjünk a tömör, lényegretörő megfogalmazásra.]"
                    answer="Igen, mert szerintem is így vagy úgy kellene működnie, ezzel értek egyet."
                  />

                  <VoteOverviewItem
                    id={3}
                    label="3. [Kérdés témája 3 nevű kérdés, biztos hogy hosszabb vagy több soros lesz, de törekedjünk a tömör, lényegretörő megfogalmazásra.]"
                    answer="Igen, mert szerintem is így vagy úgy kellene működnie, ezzel értek egyet."
                  />

                  <VoteOverviewItem
                    id={4}
                    label="4. [Kérdés témája 4 nevű kérdés, biztos hogy hosszabb vagy több soros lesz, de törekedjünk a tömör, lényegretörő megfogalmazásra.]"
                    answer="Igen, mert szerintem is így vagy úgy kellene működnie, ezzel értek egyet."
                  />
                </div>

                <div className="button-wrapper">
                  <button type="button" className="btn btn-primary">Leadom a szavazatomat</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </>
  )
}

export default QuestionPage
