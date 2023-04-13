import React from "react"
import VoteRadio from '../form/elements/VoteRadio'

export default function QuestionOptions({ id, answer, optionLabelYes, optionLabelNo, handleChange, handleSkip }) {
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
          <span>{optionLabelYes}</span>
        </VoteRadio>

        <VoteRadio
          id={`question_${id}_no`}
          name={`question_${id}`}
          option='no'
          value={answer}
          handleChange={handleChange}
        >
          <b>Nem,</b>
          <span>{optionLabelNo}</span>
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
