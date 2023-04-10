import React from 'react'

export default function VoteRadio({ id, name, option, value, children, handleChange }) {
  return (
    <div className={`radio-inline${value === option ? ' radio-inline-active': ''}`}>
      <label htmlFor={id}>
        <input
          type="radio"
          id={id}
          name={name}
          value={option}
          checked={value === option}
          onChange={(e) => {
            handleChange(e.target.value)
          }} />
        <div className="radio-label">
          {children}
        </div>
      </label>
    </div>
  )
}
