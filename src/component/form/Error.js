const Error = ({ message }) => {
  if (typeof message !== 'string') {
    console.log(message)

    return null
  }

  return (
    <div className="error-message" dangerouslySetInnerHTML={{ __html: message }}>
    </div>
  )
}

export default Error
