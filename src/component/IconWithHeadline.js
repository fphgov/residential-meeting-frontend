import React from 'react'
import Image from 'next/image'

function IconWithHeadline({ headlineText, icon }) {

  return (
    <>
      <div className='headline-with-icon-wrapper'>
        <div className='headline-icon-background'>
          <Image src={icon} alt='Email Icon' width={18} height={18} />
        </div>
        <h2>{headlineText}</h2>
      </div>
    </>
  )
}

export default IconWithHeadline
