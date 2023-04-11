import ErrorMini from "./ErrorMini"

const ErrorMiniWrapper = ({ error, id }) => {
  return (
    <>
      {error && error[id] ? Object.values(error[id]).map((err, i) => {
        return <ErrorMini key={i} error={err} increment={`${id}-${i}`} />
      }) : null}
    </>
  )
}

export default ErrorMiniWrapper
