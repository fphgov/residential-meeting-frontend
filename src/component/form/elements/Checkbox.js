import React from "react"

export default function Checkbox({ id, name, value, onChange, children }) {
  return (
    <>
      <input className="form-control styled-checkbox" id={id} name={name} type="checkbox" value={value} onChange={onChange} />
      <label htmlFor={name} className="checkbox">
        {children}
      </label>
    </>
  )
}
