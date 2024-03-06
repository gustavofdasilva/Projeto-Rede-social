import React from 'react'

type Props = {
  userName: string,
  postData: Date,
  desc: string,
}

function formatDate(date: Date) {
  const day = date.getDate().toString().length==1? `0${date.getDate()}` : date.getDate()
  const month = date.getMonth().toString().length==1? `0${date.getMonth()}` : date.getMonth()
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

const Post = (props: Props) => {
  return (
    <section className='p-3 bg-light m-3 rounded'>
      <div className='d-flex align-items-center mb-3 '>
        <img src="https://placehold.co/120x120" alt="#" width={60}/>
        <p className='m-0 ms-3'>{props.userName} - {formatDate(props.postData)}</p>
      </div>
      <p>{props.desc}</p>
      <img src="https://placehold.co/600x400" alt="#" className='w-100'/>
    </section>
  )
}

export default Post
