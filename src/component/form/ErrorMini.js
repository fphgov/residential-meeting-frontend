const ErrorMini = ({ error, increment, className, first = false }) => {
  if (typeof error === 'object') {
    if (first) {
      return (<div key={Object.keys(error)[0]} className={`error-message-inline ${className ? className : ''}`}>{Object.values(error)[0]}</div>)
    }

    return Object.values(error).map((e, i) => {
      return (<div key={i} className={`error-message-inline ${className ? className : ''}`}>{e}</div>)
    })
  } else {
    return (<div key={increment} className={`error-message-inline ${className ? className : ''}`}>{error}</div>)
  }
}

export default ErrorMini
