const Profile = () => {
  return (
    <div className="d-flex vw-100 vh-100 bg-dark justify-content-center aligm-items-center">
    <a href="/" className="btn btn-outline-secondary position-absolute top-0 start-0 m-3">Página inicial</a>
      <main className="mx-auto bg-light my-auto p-5 rounded w-75 h-75 d-flex ">
        <img src="https://placehold.co/120x120" alt="" width={100}/><h1>Hello World</h1>
      </main>
    </div>
  )
}

export default Profile
