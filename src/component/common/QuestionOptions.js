import React from "react"
import VoteRadio from '../form/elements/VoteRadio'

export default function QuestionOptions({ id, answer, optionLabelYes, optionLabelNo, handleChange, handleSkip, handleNext, enableNext = true }) {
  return (
    <>
      <div className="form-group" tabIndex={0} role="radiogroup">
        <VoteRadio
          id={`question_${id}_yes`}
          name={`question_${id}`}
          option='yes'
          value={answer}
          handleChange={handleChange}
        >
          <span dangerouslySetInnerHTML={{ __html: optionLabelYes }} />
        </VoteRadio>

        <VoteRadio
          id={`question_${id}_no`}
          name={`question_${id}`}
          option='no'
          value={answer}
          handleChange={handleChange}
        >
          <span dangerouslySetInnerHTML={{ __html: optionLabelNo }} />
        </VoteRadio>
      </div>

      <div className="vote-skip-wrapper">
        <div>
          <button className="btn-link" type="button" onClick={handleSkip}>
            Kihagyom ezt a kérdést
          </button>
        </div>

        {enableNext ? <div>
          <button className={`btn btn-primary btn-small${answer !== null ? ' active' : ''}`} type="button" onClick={handleNext} disabled={answer === null}>
            Következő
          </button>
        </div> : null}
      </div>
    </>
  )
}
