import React from "react"

export default function InputText({ id, name, placeholder, value, onChange, label, longInfo, info }) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      {longInfo ? <div className="long-info">{longInfo}</div> : ''}
      <input type="text" autoCorrect="off" autoCapitalize="none" placeholder={placeholder} name={name} id={id} value={value} onChange={onChange} />
      {info ? <div className="info">{info}</div> : ''}
    </>
  )
}
