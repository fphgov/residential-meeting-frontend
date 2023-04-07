import React from "react"

export default function Submit({ label, loading }) {
  return (
    <>
      <button type="submit" className={`btn btn-primary btn-icon ${loading ? 'btn-loading' : ''}`}>
        <div className="button-inner">
          {label}
          <div className="icon" />
        </div>

        {loading ? <div className="button-loader"></div> : null}
      </button>
    </>
  )
}
