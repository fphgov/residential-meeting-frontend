import React, { useEffect, useContext, useState, useRef } from 'react'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-v3'
import axios from "../src/assets/axios"
import Error  from "../src/component/form/Error"
import StoreContext from '../src/StoreContext'
import HeaderSection from '../src/section/HeaderSection'
import FooterSection from '../src/section/FooterSection'
import VoteNavigation from '../src/component/VoteNavigation'
import VoteOverviewItem from '../src/component/VoteOverviewItem'
import ScrollTo from "../src/component/common/ScrollTo"
import NoSSR from "../src/component/common/NoSSR"

function QuestionPage() {
  const context = useContext(StoreContext)
  const router = useRouter()
  const overviewSection = useRef()

  const { publicRuntimeConfig } = getConfig()

  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(null)
  const [ scroll, setScroll ] = useState(false)
  const [ recaptcha, setRecaptcha ] = useState(null)
  const [ recaptchaToken, setRecaptchaToken ] = useState('')

  const form = context.storeGet('form')?.data
  const questions = context.storeGet('questions')?.data

  const handleOnChange = (newAnswer, question) => {
    console.log(newAnswer)
    console.log(question)
  }

  const scrollToOverview = () => {
    window.scrollTo({
      top: overviewSection.current.offsetTop,
      left: 0,
      behavior: 'smooth'
    })
  }

  const submitQuestion = () => {
    setLoading(true)

    const fillQuestions = {}
    for (let index = 0; index < questions.length; index++) {
      const question = questions[index]

      fillQuestions[`questions[${question.id}]`] = form[`question_${question.id}`]
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
        console.log(data)
      }
    })
    .catch(error => {
      if (error.response && error.response.status === 403) {
        setError('Google reCapcha ellenőrzés sikertelen')
      } else if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error)
      } else if (error.response && error.response.data && error.response.data.errors) {
        setError(error.response.data.errors)
      } else {
        setError('Váratlan hiba történt, kérünk próbáld később')
      }

      setScroll(true)

      recaptcha.execute()
    })
    .finally(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    if (! (form && form.auth_code)) {
      router.push('/azonositas')
    }

    loadReCaptcha(getConfig().publicRuntimeConfig.siteKey, (recaptchaToken) => {
      setRecaptchaToken(recaptchaToken)
    })
  }, []);

  if (! form || ! questions) {
    return null
  }

  return (
    <>
      <NoSSR>
        <HeaderSection />

        <main className="page">
          <VoteNavigation list={questions} state={questions.length} />

          <div className="vote-section">
            <div className="container">
              <div className="row">
                <div className="offset-lg-2 col-lg-8">
                  <h1>[Itt láthatod a leadott szavazatodat a témakörökben. Még lehetőséged van visszamenni módosítani, ha szeretnél!]</h1>

                  {error ? <Error message={error} /> : null}

                  <div className="button-wrapper">
                    <button type="button" className="btn btn-primary" onClick={submitQuestion}>Leadom a szavazatomat</button>
                    <button type="button" className="btn btn-secondary" onClick={scrollToOverview}>Áttekintés</button>
                  </div>

                  <div className="overview" ref={overviewSection}>
                    {questions.map(question => {
                      return (
                        <VoteOverviewItem
                          key={question.id}
                          question={question}
                          label={question.question}
                          onChange={handleOnChange}
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
                    <button type="button" className="btn btn-primary" onClick={submitQuestion}>Leadom a szavazatomat</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {scroll && document.querySelector('.error-message-inline') ? <ScrollTo element={document.querySelector('.error-message-inline').offsetTop} /> : null}
        </main>

        <FooterSection />
      </NoSSR>
    </>
  )
}

export default QuestionPage
