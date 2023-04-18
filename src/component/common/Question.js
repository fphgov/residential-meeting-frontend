import React from "react"
import QuestionOptions from './QuestionOptions'

export default function Question({ id, title, children, answer, optionLabelYes, optionLabelNo, handleChange, handleSkip }) {
  return (
    <>
      {children}

      <h4>{id}. {title}</h4>

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
