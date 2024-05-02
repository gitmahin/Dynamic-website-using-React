import React, { useEffect} from 'react'
import { useAuth } from '../store/authenticate'

const MyBlog = () => {
  const {post} = useAuth()

  return (
    <main className='admin-post-main-wrap' >
      <h1>Blog</h1>
      <div className="admin-post-wrapper">
<div className="admin-post-container">
      {post.map((p) =>{
        return <div className="card" key={p._id}>
          <div className="img">
            <img src={p.postimg} alt="Image" />
          </div>
          <div className="maincontent">
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
          </div>
          <div className="button-container-admin-post">
            <p>{p.postDAte}</p>
            <button className="admin-p-btn">Read more</button>
          </div>
          <div className="btn-hover-effect">

          </div>
        </div>
      })}

</div>
      </div>
    </main>
  )
}

export default MyBlog
