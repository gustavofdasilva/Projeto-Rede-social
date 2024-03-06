const SendPost = () => {
  return (
    <section className='p-3 bg-light m-3 d-flex justify-content-between align-items-center rounded'>
        <textarea name="text" id="text" rows={1} className='w-75'></textarea>
        <button className='btn btn-primary'>Post</button>
    </section>
  )
}

export default SendPost
