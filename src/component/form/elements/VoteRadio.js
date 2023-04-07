import React from 'react'

export default function VoteRadio({ id, name, option, value, children, handleChange }) {
  return (
    <div className="radio-inline">
      <input
        type="radio"
        id={id}
        name={name}
        value={option}
        checked={value === option}
        onChange={(e) => {
          handleChange(e.target.value)
        }} />
      <label htmlFor={id}>{children}</label>
    </div>
  )
}
