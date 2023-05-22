import React from "react";
import { useRouter } from 'next/router';

export default function NavigationButton({ label, loading, enableIcon = true, disabled = false, url = '/' }) {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    if (!loading) {
      router.push(url);
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`btn btn-primary${enableIcon ? ' btn-icon' : ''}${loading ? ' btn-loading' : ''}`}
      disabled={disabled || loading}
    >
      <div className="button-inner">
        {label}
        {enableIcon ? <div className="icon" /> : ''}
      </div>

      {loading ? <div className="button-loader"></div> : null}
    </button>
  )
}
