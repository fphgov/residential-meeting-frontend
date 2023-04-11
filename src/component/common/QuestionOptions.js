import React from "react"
import VoteRadio from '../form/elements/VoteRadio'

export default function QuestionOptions({ id, answer, optionYesLabel, optionNoLabel, handleChange, handleSkip }) {
  return (
    <>
      <div className="form-group">
        <VoteRadio
          id={`question_${id}_yes`}
          name={`question_${id}`}
          option='yes'
          value={answer}
          handleChange={handleChange}
        >
          <b>Igen,</b>
          <span>{optionYesLabel}</span>
        </VoteRadio>

        <VoteRadio
          id={`question_${id}_no`}
          name={`question_${id}`}
          option='no'
          value={answer}
          handleChange={handleChange}
        >
          <b>Nem,</b>
          <span>{optionNoLabel}</span>
        </VoteRadio>
      </div>

      <div className="vote-skip-wrapper">
        <button className="btn-link" type="button" onClick={handleSkip}>
          Kihagyom ezt a kérdést
        </button>
      </div>
    </>
  )
}
