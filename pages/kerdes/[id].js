import React, { useEffect, useState, useContext } from 'react'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import StoreContext from '../../src/StoreContext'
import HeaderSection from '../../src/section/HeaderSection'
import FooterSection from '../../src/section/FooterSection'
import MultiDetails from '../../src/component/common/MultiDetails'
import Question  from "../../src/component/common/Question"
import VoteNavigation from "../../src/component/VoteNavigation"

function QuestionPage({ id, question, navigationList }) {
  const context = useContext(StoreContext)
  const router = useRouter()

  const [ answer, setAnswer ] = useState(null)
  const [ details, setDetails ] = useState(null)

  const form = context.storeGet('form')

  const storeAnswer = (e) => {
    setAnswer(e)

    if (form && form.data) {
      form.data[`question_${id}`] = e

      context.storeSave('form', 'data', form.data)
    }
  }

  const handleNext = () => {
    if (navigationList.length > (id - 0)) {
      router.push(`/kerdes/${(id - 0) + 1}`)
    } else {
      router.push('/osszesito')
    }
  }

  const handleChange = (e) => {
    storeAnswer(e)
  }

  useEffect(() => {
    if (! (form && form.data && form.data.auth_code)) {
      router.push('/azonositas')

      return
    }

    if (form && form.data && form.data[`question_${id}`]) {
      setAnswer(form.data[`question_${id}`])
    } else {
      storeAnswer(null)
    }

    setDetails([
      { id: `${id}-detail-yes`, summary: question.summaryOptionYes, description: question.descriptionOptionYes },
      { id: `${id}-detail-no`, summary: question.summaryOptionNo, description: question.descriptionOptionNo },
    ])
  }, [router])

  return (
    <>
      <HeaderSection />

      <main className="page">
        <VoteNavigation list={navigationList} state={id} />

        {question ? <>
          <div className="vote-section">
            <div className="container">
              <div className="row">
                <div className="offset-lg-2 col-lg-8">
                  <Question
                    id={question.id}
                    questionShort={question.questionShort}
                    title={<>{question.question}</>}
                    answer={answer}
                    optionLabelYes={question.optionLabelYes}
                    optionLabelNo={question.optionLabelNo}
                    handleChange={handleChange}
                    handleSkip={() => {
                      handleChange(null)
                      handleNext()
                    }}
                    handleNext={handleNext}
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
                  <h2>{question.summaryHeadline}</h2>
                </div>
                <div className="col-lg-9">
                  <MultiDetails className="section-more" details={details} />
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

async function getNavigationList(config) {
  const res = await fetch(config.apiUrl + config.apiNavigation, {
    headers: {
      Accept: 'application/json',
    },
    next: { revalidate: 10 },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json()
}

async function getQuestion(config, id) {
  const res = await fetch(config.apiUrl + config.apiQuestion.toString().replace(':id', id), {
    headers: {
      Accept: 'application/json',
    },
    next: { revalidate: 10 },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json()
}

export async function getServerSideProps({ params }) {
  const { serverRuntimeConfig } = getConfig()

  try {
    const navigationListData = await getNavigationList(serverRuntimeConfig)
    const questionData = await getQuestion(serverRuntimeConfig, params.id)

    return {
      props: {
        id: params.id,
        question: questionData.question,
        navigationList: navigationListData.questions,
      }
    }
  } catch (e) {
    console.log(e)

    return {
      notFound: true,
    }
  }
}

export default QuestionPage
