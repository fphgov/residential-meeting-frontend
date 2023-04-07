import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import StoreContext from '../../src/StoreContext'
import HeaderSection from '../../src/section/HeaderSection'
import FooterSection from '../../src/section/FooterSection'
import VoteRadio  from "../../src/component/form/elements/VoteRadio"

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
        <div className="vote-navigation">
          <ul>
            <li>
              <div className="question-info">
                <div className="number active">1</div>Lánchíd forgalma
              </div>
            </li>
            <li>
              <div className="question-info">
                <div className="number active">2</div>[Kérdés témája 2]
              </div>
            </li>
            <li>
              <div className="question-info">
                <div className="number">3</div>[Kérdés témája 3]
              </div>
            </li>
            <li>
              <div className="question-info">
                <div className="number">4</div>[Kérdés témája 4]
              </div>
            </li>
          </ul>
        </div>

        <div className="vote-section">
          <div className="container">
            <div className="row">
              <div className="offset-lg-2 col-lg-8">
                <h2>{id}. [Kérdés témája {id} nevű kérdés, biztos hogy hosszabb vagy több soros lesz, de törekedjünk a tömör, lényegretörő megfogalmazásra.]</h2>

                <p>[A kérdés egyéb részleteit ide ki lehet fejteni, érdemes így szétbontani, ha hosszabb és/vagy összetettebb a kérdés, a felhasználónak is könnyebb így befogadnia/értelmeznie az infót, mint egybe ömlesztve. A kérdés egyéb részleteit ide ki lehet fejteni, érdemes így szétbontani, ha hosszabb és/vagy összetettebb a kérdés, a felhasználónak is könnyebb így befogadnia/értelmeznie az infót, mint egybe ömlesztve.</p>

                <p>A kérdés egyéb részleteit ide ki lehet fejteni, érdemes így szétbontani, ha hosszabb és/vagy összetettebb a kérdés, a felhasználónak is könnyebb így befogadnia/értelmeznie az infót, mint egybe ömlesztve. A kérdés egyéb részleteit ide ki lehet fejteni, érdemes így szétbontani, ha hosszabb és/vagy összetettebb a kérdés, a felhasználónak is könnyebb így befogadnia/értelmeznie az infót, mint egybe ömlesztve.]</p>

                <div className="form-group">
                  <VoteRadio
                    id={`question_${id}_yes`}
                    name={`question_${id}`}
                    option='yes'
                    value={answer}
                    handleChange={handleChange}
                  >
                    <b>Igen,</b>
                    <span>mert szerintem is így vagy úgy kellene működnie.</span>
                  </VoteRadio>

                  <VoteRadio
                    id={`question_${id}_no`}
                    name={`question_${id}`}
                    option='no'
                    value={answer}
                    handleChange={handleChange}
                  >
                    <b>Nem,</b>
                    <span>mert szerintem is így vagy úgy kellene működnie.</span>
                  </VoteRadio>
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
