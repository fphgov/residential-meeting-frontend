const ErrorMini = ({ error, increment, first = false }) => {
  if (typeof error === 'object') {
    if (first) {
      return (<div key={Object.keys(error)[0]} className="error-message-inline">{Object.values(error)[0]}</div>)
    }

    return Object.values(error).map((e, i) => {
      return (<div key={i} className="error-message-inline">{e}</div>)
    })
  } else {
    return (<div key={increment} className="error-message-inline">{error}</div>)
  }
}

export default ErrorMini
