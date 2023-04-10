import React from "react"
import VoteRadio from '../form/elements/VoteRadio'

export default function Question({ id, title, children, answer, optionYesLabel, optionNoLabel, handleChange, handleSkip }) {
  return (
    <>
      <h2>{title}</h2>

      {children}

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
        <button className="vote-skip" type="button" onClick={handleSkip}>
          Kihagyom ezt a kérdést
        </button>
      </div>
    </>
  )
}
