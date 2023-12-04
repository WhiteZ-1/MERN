import React from 'react'
import { Link, useNavigate } from 'react-router-dom';


const Navbar = (props) => {
  const navigate = useNavigate()
  const handlelogout = ()=>{
    localStorage.removeItem("token")
    navigate("/login")
  }
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-dark" id="nav" data-bs-theme="dark">
            <div className="container-fluid">
                    <Link className="navbar-brand" to="/">{props.title}</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {localStorage.getItem("token") && <div   className="d-flex">
                      <ul  className="navbar-nav me-auto mb-2 mb-lg-0">
                          <li className="nav-item">
                          <Link id="btn"  aria-current="page" to="/" >Home</Link>
                          </li>
                          <li className="nav-item">
                          <Link  id="btn"  to="/about">About</Link>
                          </li>
                      </ul>
                        <ul className="navbar-nav">
                          <li className="nav-item">
                            <Link id="btn" to="/login" onClick={handlelogout}>Logout</Link>
                          </li>
                      </ul>
                    </div>}
                    {!localStorage.getItem("token") && <div className="d-flex" role="search">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                          <li className="nav-item">
                            <Link id="btn" to="/login">Login</Link>
                          </li>
                          <li className="nav-item">
                            <Link id="btn"  to="/signup">Sign Up</Link>
                          </li>
                      </ul>
                    </div>}
            </div>
        </div>
        </nav>
    </div>
  )
}

export default Navbar
