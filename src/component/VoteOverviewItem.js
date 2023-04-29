import { useEffect, useState } from 'react'
import QuestionOptions from '../../src/component/common/QuestionOptions'

export default function VoteOverviewItem({ question, label, form, onChange }) {
  const [modify, setModify] = useState(false)
  const [answerLabel, setAnswerLabel] = useState(null)
  const [answer, setAnswer] = useState(null)

  const handleChange = () => {
    setModify(false)

    if (typeof onChange === "function") {
      onChange(answer, question)
    }
  }

  useEffect(() => {
    if (form && form["question_" + question.id] !== null) {
      const loweredAnswer = form["question_" + question.id].toLowerCase()
      const capitalized = loweredAnswer?.charAt(0).toUpperCase() + loweredAnswer.slice(1)

      setAnswer(loweredAnswer)
      setAnswerLabel(question['optionLabel' + capitalized])
    } else {
      setAnswerLabel('Nem adtál választ!')
      setAnswer(null)
    }
  }, [question])

  return (
    <div className="vote-overview-item">
      <div className="question-label">{label}</div>

      <div className="question-answer-wrapper">
        <div className="question-answer-label">Általad adott válasz:</div>
        <div className="question-answer-inner">
          <div className="question-answer" dangerouslySetInnerHTML={{ __html: answerLabel }} />
          <div className="question-modify-control">
            {modify ?
              <>
                <button type="button" className="btn-link btn-small" onClick={() => {setModify(false)}}>Mégse</button>
                <button type="button" className="btn btn-primary btn-small" onClick={handleChange}>Mentés</button>
              </>
              : <>
              <button type="button" className="btn btn-secondary btn-small" onClick={() => {setModify(! modify)}}>Módosítás</button>
            </>}
          </div>
        </div>

        {modify ? <div className="question-modify">
          <QuestionOptions
            id={question.id}
            answer={answer}
            optionLabelYes={question.optionLabelYes}
            optionLabelNo={question.optionLabelNo}
            handleChange={(e) => {
              setAnswer(e)
            }}
            handleSkip={() => {
              setAnswer(null)
            }}
          />
        </div> : null}

      </div>
    </div>
  )
}
