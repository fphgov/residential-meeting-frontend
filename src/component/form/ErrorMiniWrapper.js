import ErrorMini from "./ErrorMini"

const ErrorMiniWrapper = ({ error, id, className, first = true }) => {
  if (first) {
    return (
      <>
        {error && error[id] ? <ErrorMini key={Object.keys(error[id])[0]} error={Object.values(error[id])[0]} increment={`${id}-0`} first={first} className={className} /> : null}
      </>
    )
  }

  return (
    <>
      {error && error[id] ? Object.values(error[id]).map((err, i) => {
        return <ErrorMini key={i} error={err} increment={`${id}-${i}`} first={first} className={className} />
      }) : null}
    </>
  )
}

export default ErrorMiniWrapper
