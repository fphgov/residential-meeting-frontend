import React from "react"

export default function Checkbox({ id, name, value, ariaInvalid, ariaRequired, onChange, children }) {
  return (
    <>
      <input className="form-control styled-checkbox" aria-invalid={ariaInvalid} aria-required={ariaRequired} id={id} name={name} type="checkbox" checked={value} value={value} onChange={onChange} />
      <label htmlFor={name} className="checkbox">
        {children}
      </label>
    </>
  )
}
