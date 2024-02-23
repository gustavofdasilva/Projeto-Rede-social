import React from 'react'

const Post = () => {
  return (
    <section className='p-3 bg-light m-3'>
      <div className='d-flex align-items-center justify-content-between mb-4'>
        <img src="https://placehold.co/120x120" alt="#" width={60}/>
        <p>User - Date</p>
      </div>
      <p>Description</p>
      <img src="https://placehold.co/600x400" alt="#" className='w-100'/>
    </section>
  )
}

export default Post
