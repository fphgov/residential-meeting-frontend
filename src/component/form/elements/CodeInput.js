import { useRef } from 'react'
import { IMaskInput } from 'react-imask'

export default function CodeInput({ id, name, ariaInvalid, ariaRequired, onChange, label, longInfo, info }) {
  const ref = useRef(null)
  const inputRef = useRef(null)

  return (
    <>
      <label htmlFor={id}>{label}</label>

      {longInfo ? <div className="long-info">{longInfo}</div> : ''}

      <IMaskInput
        id={id}
        name={name}
        type="text"
        autoCorrect="off"
        autoCapitalize="none"
        mask='LGY-0000-aaaa'
        lazy={false}
        unmask={false}
        ref={ref}
        inputRef={inputRef}
        aria-invalid={ariaInvalid}
        aria-required={ariaRequired}
        prepare={(str) => {
          return str.toUpperCase()
        }}
        onAccept={
          (value, mask) => {
            onChange({ target: { name, value } })
          }
        }
      />
      {info ? <div className="info">{info}</div> : ''}
    </>
  )
}
