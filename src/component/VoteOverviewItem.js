import { useState } from 'react'
import QuestionOptions from '../../src/component/common/QuestionOptions'

export default function VoteOverviewItem({ id, label, answer }) {
  const [modify, setModify] = useState(false)

  const handleChange = () => {
    setModify(false)
  }

  return (
    <div className="vote-overview-item">
      <div className="question-label">{label}</div>

      <div className="question-answer-wrapper">
        <div className="question-answer-label">Általad adott válasz:</div>
        <div className="question-answer-inner">
          <div className="question-answer">{answer}</div>
          <div className="question-modify-control">
            {modify ?
              <>
                <button type="button" className="btn-link btn-small" onClick={() => {setModify(false)}}>Mégse</button>
                <button type="button" className="btn btn-primary btn-small" onClick={() => {setModify(! modify)}}>Mentés</button>
              </>
              : <>
              <button type="button" className="btn btn-secondary btn-small" onClick={() => {setModify(! modify)}}>Módosítás</button>
            </>}
          </div>
        </div>

        {modify ? <div className="question-modify">
          <QuestionOptions
            id={id}
            answer={answer}
            optionYesLabel="mert szerintem is így vagy úgy kellene működnie."
            optionNoLabel="mert szerintem is így vagy úgy kellene működnie."
            handleChange={handleChange}
            handleSkip={() => {setModify(false)}}
          />
        </div> : null}

      </div>
    </div>
  )
}
