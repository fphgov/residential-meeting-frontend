import React from "react"

export default function Dropdown({ id, name, value, onChange, label, longInfo, info, disabled }) {
  const districts = [
    "I. kerület",
    "II. kerület",
    "III. kerület",
    "IV. kerület",
    "V. kerület",
    "VI. kerület",
    "VII. kerület",
    "VIII. kerület",
    "IX. kerület",
    "X. kerület",
    "XI. kerület",
    "XII. kerület",
    "XIII. kerület",
    "XIV. kerület",
    "XV. kerület",
    "XVI. kerület",
    "XVII. kerület",
    "XVIII. kerület",
    "XIX. kerület",
    "XX. kerület",
    "XXI. kerület",
    "XXII. kerület",
    "XXIII. kerület"
  ];

  return (
    <div className="dropdown-input-container">
      <label htmlFor={id}>{label}</label>
      {longInfo ? <div className="long-info">{longInfo}</div> : ''}
      <select disabled={disabled} name={name} id={id} value={value} onChange={onChange} className="dropdown-select">
      <option value="" disabled selected>Válassz a legördülő listából!</option>
        {districts.map((district, index) => 
          <option key={index} value={index+1}>{district}</option>
        )}
      </select>
      {info ? <div className="info">{info}</div> : ''}
    </div>
  )
}
