const ErrorMini = (props) => {
  if (typeof props.error === 'object') {
    return Object.values(props.error).map((e, i) => {
      return (<div key={i} className="error-message-inline">{e}</div>)
    })
  } else {
    return (<div key={props.increment} className="error-message-inline">{props.error}</div>)
  }
}

export default ErrorMini
