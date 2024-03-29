import React, { useEffect, useContext, useState, useRef } from 'react'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-v3'
import axios from "axios"
import Error  from "../src/component/form/Error"
import Submit  from "../src/component/form/elements/Submit"
import StoreContext from '../src/StoreContext'
import HeaderVoteSection from '../src/section/HeaderVoteSection'
import FooterSection from '../src/section/FooterSection'
import VoteNavigation from '../src/component/VoteNavigation'
import VoteOverviewItem from '../src/component/VoteOverviewItem'

function QuestionPage({ questions }) {
  const context = useContext(StoreContext)
  const router = useRouter()
  const overviewSection = useRef()

  const { publicRuntimeConfig } = getConfig()

  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(null)
  const [ recaptcha, setRecaptcha ] = useState(null)
  const [ recaptchaToken, setRecaptchaToken ] = useState('')
  const [ modifyElemStatus, setModifyElemStatus ] = useState({})

  const form = context.storeGet('form')?.data

  const handleIsLocked = (id, locked) => {
    const status = { ...modifyElemStatus }

    status[id] = locked

    setModifyElemStatus(status)

    setError(null)
  }

  const handleOnChange = (newAnswer, question) => {
    form[`question_${question.id}`] = newAnswer

    context.storeSave('form', 'data', form)
  }

  const scrollToOverview = () => {
    window.scrollTo({
      top: overviewSection.current.offsetTop,
      left: 0,
      behavior: 'smooth'
    })
  }

  const scrollToError = (query = '.error-message') => {
    setTimeout(() => {
      const element = document.querySelector(query)

      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          left: 0,
          behavior: 'smooth'
        })
      }
    }, 1)
  }

  const submitQuestion = (e) => {
    e.preventDefault()

    setError(null)

    if (Object.values(modifyElemStatus).filter(t => t === true).length > 0) {
      setError('Nem véglegesítettél minden kérdést. Véglegesítés után tudod leadni a szavazatod.')
      scrollToError()

      return
    }

    setLoading(true)

    const fillQuestions = {}
    for (let index = 0; index < questions.length; index++) {
      const question = questions[index]

      if (typeof form[`question_${question.id}`] !== "undefined") {
        fillQuestions[`questions[${question.id}]`] = form[`question_${question.id}`]
      } else {
        fillQuestions[`questions[${question.id}]`] = null
      }
    }

    const data = {
      auth_code: form.auth_code,
      email: form.email,
      privacy: form.privacy,
      newsletter: form.newsletter,
      ...fillQuestions,
      'g-recaptcha-response': recaptchaToken,
    }

    axios.post(
      publicRuntimeConfig.apiVote,
      new URLSearchParams(data).toString(),
      {
        headers: {
          Authorization: form.auth_code
        }
      }
    )
    .then(response => {
      if (response.data) {
        router.push('/sikeres')
      }
    })
    .catch(error => {
      if (error.response && error.response.status === 403) {
        setError('Google reCapcha ellenőrzés sikertelen. Kérjük frissíts rá az oldalra.')
      } else if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error)
      } else if (error.response && error.response.data && error.response.data.errors) {
        setError(error.response.data.errors)
      } else {
        setError('Váratlan hiba történt, kérünk próbáld később')
      }

      scrollToError()

      recaptcha.execute()
    })
    .finally(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    if (! (form && form.auth_code)) {
      router.push('/azonositas')

      return
    }

    loadReCaptcha(getConfig().publicRuntimeConfig.siteKey, (recaptchaToken) => {
      setRecaptchaToken(recaptchaToken)
    })
  }, []);

  return (
    <>
      <HeaderVoteSection />

      <main className="page">
        <VoteNavigation list={questions} state={questions.length} />

        <div className="vote-section">
          <div className="container">
            <div className="row">
              <div className="offset-lg-2 col-lg-8">
                <form onSubmit={submitQuestion}>
                  <h2 style={{ textAlign: 'center' }}>Szavazatod leadása előtt áttekintheted és módosíthatod a válaszaidat, vagy leadhatod szavazatodat.</h2>

                  {error ? <Error message={error} /> : null}

                  <div className="button-wrapper">
                    <Submit label="Leadom a szavazatomat" loading={loading} disabled={false} enableIcon={false} />
                    <button type="button" className="btn btn-secondary" onClick={scrollToOverview}>Áttekintés</button>
                  </div>

                  <div className="overview" ref={overviewSection}>
                    {questions.map(question => {
                      return (
                        <VoteOverviewItem
                          key={question.id}
                          id={question.id}
                          question={question}
                          label={`${question.id}. ${question.questionShort} - ${question.question}`}
                          onChange={handleOnChange}
                          onIsLocked={handleIsLocked}
                          form={form}
                        />
                      )
                    })}
                  </div>

                  <ReCaptcha
                    ref={ref => setRecaptcha(ref)}
                    sitekey={publicRuntimeConfig.siteKey}
                    action="submit"
                    verifyCallback={(recaptchaToken) => {
                      setRecaptchaToken(recaptchaToken)
                    }}
                  />

                  <div className="button-wrapper">
                    <Submit label="Leadom a szavazatomat" loading={loading} disabled={false} enableIcon={false} />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </>
  )
}

async function getQuestions(config) {
  const res = await fetch(config.apiUrl + config.apiQuestionAll, {
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

export async function getServerSideProps() {
  const { serverRuntimeConfig } = getConfig()

  try {
    const questiosnData = await getQuestions(serverRuntimeConfig)

    return {
      props: {
        questions: questiosnData.questions,
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
