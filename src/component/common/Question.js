import React from "react"
import QuestionOptions from './QuestionOptions'

export default function Question({ id, title, children, answer, optionYesLabel, optionNoLabel, handleChange, handleSkip }) {
  return (
    <>
      <h2>{title}</h2>

      {children}

      <QuestionOptions
        id={id}
        answer={answer}
        optionYesLabel={optionYesLabel}
        optionNoLabel={optionNoLabel}
        handleChange={handleChange}
        handleSkip={handleSkip}
      />
    </>
  )
}
