const ErrorInfo = ({ message }) => {
  if (typeof message !== 'string') {

    return null
  }

  return (
    <div className="error-message error-info">
      <div className="info-icon">i</div>
      <div className="error-text" dangerouslySetInnerHTML={{ __html: message }}></div>
    </div>
  )
}

export default ErrorInfo
