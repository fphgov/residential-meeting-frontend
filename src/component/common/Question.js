import React from "react"
import QuestionOptions from './QuestionOptions'

export default function Question({ id, title, children, answer, optionLabelYes, optionLabelNo, handleChange, handleSkip }) {
  return (
    <>
      <h2>{title}</h2>

      {children}

      <QuestionOptions
        id={id}
        answer={answer}
        optionLabelYes={optionLabelYes}
        optionLabelNo={optionLabelNo}
        handleChange={handleChange}
        handleSkip={handleSkip}
      />
    </>
  )
}
