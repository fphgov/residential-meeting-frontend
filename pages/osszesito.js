import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import StoreContext from '../src/StoreContext'
import HeaderSection from '../src/section/HeaderSection'
import FooterSection from '../src/section/FooterSection'
import VoteNavigation from '../src/component/VoteNavigation'
import VoteOverviewItem from '../src/component/VoteOverviewItem'

function QuestionPage() {
  const context = useContext(StoreContext)
  const router = useRouter()

  const form = context.storeGet('form')?.data
  const questions = context.storeGet('questions')?.data

  const handleOnChange = (newAnswer, question) => {
    console.log(newAnswer)
    console.log(question)
  }

  useEffect(() => {
    if (! (form && form.auth_code)) {
      router.push('/azonositas')
    }
  }, []);

  if (! form || ! questions) {
    return null
  }

  return (
    <>
      <HeaderSection />

      <main className="page">
        <VoteNavigation list={questions} />

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
                  {questions.map(question => {
                    const answer = form["question_" + "1"] !== null ? question['optionLabel' + form["question_" + "1"].toLowerCase()] : null

                    return (
                      <VoteOverviewItem
                        key={question.id}
                        question={question}
                        label={question.question}
                        onChange={handleOnChange}
                        answer={answer}
                      />
                    )
                  })}
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
