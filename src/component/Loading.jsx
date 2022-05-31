import React from 'react'

function Loading() {
  return (
    <div className='d-flex justify-content-between'>
        <strong>Loading...</strong>
        <div 
        className='ml-auto spinner-border text-danger'
        role='status'
        aria-hidden='tgrue'
        ></div>
      
    </div>
  )
}

export default Loading
