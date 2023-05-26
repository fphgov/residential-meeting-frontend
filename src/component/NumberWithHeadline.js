import React from 'react'

function NumberWithHeadline({ headlineText, number }) {

  return (
    <>
      <div className='headline-with-icon-wrapper'>
        <div className='headline-icon-background'>
          <div className='headline-ordinal-number'>{number}.</div>
        </div>
        <h2>{headlineText}</h2>
      </div>
    </>
  )
}

export default NumberWithHeadline
