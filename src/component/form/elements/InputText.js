import React from "react"

export default function InputText({ id, name, placeholder, value, onChange, label, info }) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input type="text" autoCorrect="off" autoCapitalize="none" placeholder={placeholder} name={name} id={id} value={value} onChange={onChange} />
      <div className="info">{info}</div>
    </>
  )
}
