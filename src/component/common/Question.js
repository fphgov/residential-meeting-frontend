import React from "react"
import QuestionOptions from './QuestionOptions'

export default function Question({ id, questionShort, title, children, answer, optionLabelYes, optionLabelNo, handleChange, handleSkip, handleNext }) {
  return (
    <>
      <h1 style={{ textAlign: 'left' }}>{id}. {questionShort}</h1>

      {children}

      <h4>{title}</h4>

      <QuestionOptions
        id={id}
        answer={answer}
        optionLabelYes={optionLabelYes}
        optionLabelNo={optionLabelNo}
        handleChange={handleChange}
        handleSkip={handleSkip}
        handleNext={handleNext}
      />
    </>
  )
}
