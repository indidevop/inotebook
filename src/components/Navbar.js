import React from 'react';
import { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import noteContext from '../contexts/notes/noteContext';

const Navbar = () => {
  const { showAlert } = useContext(noteContext);

  let location = useLocation();
  const navigate = useNavigate();


  const logouthandler = () => {
    showAlert("Logged out successfully", "success");
    localStorage.clear();
    navigate('/login');

  }


  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">iNotebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname}===""?"active":""`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname}==="/about"?"active":""`} aria-current="page" to="/about">About</Link>
            </li>

          </ul>
          {!localStorage.getItem('authtoken') ? <form className="d-flex" role="search">
            <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary mx-2" to="/signup" role="button">SignUp</Link>
          </form> : <form className="d-flex" role="search">

            {localStorage.getItem('username')&&   
              <span className="navbar-text mx-2">
              Hello {localStorage.getItem('username')}
              </span>
            }
            <button className="btn btn-primary mx-2" onClick={logouthandler}>Logout</button>
          </form>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar