import React from "react"

export default function Submit({ label, loading, enableIcon = true, disabled = false }) {
  return (
    <>
      <button type="submit" className={`btn btn-primary${enableIcon ? ' btn-icon' : ''}${loading ? ' btn-loading' : ''}`} disabled={disabled || loading}>
        <div className="button-inner">
          {label}
          {enableIcon ? <div className="icon" /> : ''}
        </div>

        {loading ? <div className="button-loader"></div> : null}
      </button>
    </>
  )
}
