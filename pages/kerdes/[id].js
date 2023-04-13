import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import StoreContext from '../../src/StoreContext'
import HeaderSection from '../../src/section/HeaderSection'
import FooterSection from '../../src/section/FooterSection'
import MultiDetails from '../../src/component/common/MultiDetails'
import Question  from "../../src/component/common/Question"
import VoteNavigation from "../../src/component/VoteNavigation"

function QuestionPage() {
  const context = useContext(StoreContext)
  const router = useRouter()

  const [ answer, setAnswer ] = useState(null)

  const { id } = router.query

  const form = context.storeGet('form')
  const questions = context.storeGet('questions')?.data
  const question = context.storeGet('questions')?.data.find(q => q.id == id)

  const handleChange = (e) => {
    setAnswer(e)
  }

  useEffect(() => {
    if (! (form && form.data && form.data.auth_code)) {
      router.push('/azonositas')
    }
  }, []);

  useEffect(() => {
    if (form && form.data) {
      form.data[`question_${id}`] = answer

      context.storeSave('form', 'data', form.data)
    }
  }, [answer]);

  if (! id || ! questions) {
    return null
  }

  return (
    <>
      <HeaderSection />

      <main className="page">
        <VoteNavigation list={questions} />

        {question ? <>
          <div className="vote-section">
            <div className="container">
              <div className="row">
                <div className="offset-lg-2 col-lg-8">
                  <Question
                    id={question.id}
                    title={<>{question.question}</>}
                    answer={answer}
                    optionLabelYes={question.optionLabelYes}
                    optionLabelNo={question.optionLabelNo}
                    handleChange={handleChange}
                    handleSkip={() => {}}
                  >
                    <p>{question.description}</p>
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
                    { id: `${id}-detail-yes`, summary: '[Ha megszavazzuk, akkor várhatóan ez fog történni ...]', description: question.descriptionOptionYes },
                    { id: `${id}-detail-no`, summary: '[Ha nem megszavazzuk, akkor várhatóan ez fog történni ...]', description: question.descriptionOptionNo },
                  ]} />
                </div>
              </div>
            </div>
          </div>
        </> : null}
      </main>

      <FooterSection />
    </>
  )
}

export default QuestionPage
