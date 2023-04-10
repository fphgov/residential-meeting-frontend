import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import StoreContext from '../../src/StoreContext'
import HeaderSection from '../../src/section/HeaderSection'
import FooterSection from '../../src/section/FooterSection'
import MultiDetails from '../../src/component/common/MultiDetails'
import Question  from "../../src/component/common/Question"

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
                <Question
                  id={id}
                  title={<>{id}. [Kérdés témája {id} nevű kérdés, biztos hogy hosszabb vagy több soros lesz, de törekedjünk a tömör, lényegretörő megfogalmazásra.]</>}
                  answer={answer}
                  optionYesLabel="mert szerintem is így vagy úgy kellene működnie."
                  optionNoLabel="mert szerintem is így vagy úgy kellene működnie."
                  handleChange={handleChange}
                  handleSkip={() => {}}
                >
                  <p>[A kérdés egyéb részleteit ide ki lehet fejteni, érdemes így szétbontani, ha hosszabb és/vagy összetettebb a kérdés, a felhasználónak is könnyebb így befogadnia/értelmeznie az infót, mint egybe ömlesztve. A kérdés egyéb részleteit ide ki lehet fejteni, érdemes így szétbontani, ha hosszabb és/vagy összetettebb a kérdés, a felhasználónak is könnyebb így befogadnia/értelmeznie az infót, mint egybe ömlesztve.</p>

                  <p>A kérdés egyéb részleteit ide ki lehet fejteni, érdemes így szétbontani, ha hosszabb és/vagy összetettebb a kérdés, a felhasználónak is könnyebb így befogadnia/értelmeznie az infót, mint egybe ömlesztve. A kérdés egyéb részleteit ide ki lehet fejteni, érdemes így szétbontani, ha hosszabb és/vagy összetettebb a kérdés, a felhasználónak is könnyebb így befogadnia/értelmeznie az infót, mint egybe ömlesztve.]</p>
                </Question>
              </div>
            </div>
          </div>
        </div>

        <div className="support-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <h2>Döntéstámogató tartalmak</h2>
              </div>
              <div className="col-lg-9">
                <MultiDetails className="section-more" details={[
                  { id: `${id}-detail-yes`, summary: '[Ha megszavazzuk, akkor várhatóan ez fog történni ...]', description: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non iste illum qui provident eum tenetur voluptas ipsum ducimus esse, culpa praesentium libero voluptatibus accusantium consectetur, doloribus eos quia earum. Quo?</p>', open: false },
                  { id: `${id}-detail-no`,summary: '[Ha nem megszavazzuk, akkor várhatóan ez fog történni ...]', description: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non iste illum qui provident eum tenetur voluptas ipsum ducimus esse, culpa praesentium libero voluptatibus accusantium consectetur, doloribus eos quia earum. Quo?</p>' },
                ]} />
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
