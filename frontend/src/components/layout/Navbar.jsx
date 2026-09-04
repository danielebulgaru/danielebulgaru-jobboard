import { Link } from 'react-router-dom';
import { getUser, logout } from '../../auth';

export default function Navbar() {
  const user = getUser();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center fw-bold fs-4" to="/">
          <i className="bi bi-briefcase-fill me-2 fs-3"></i>
          <span>JobBoard</span>
        </Link>

        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item mx-1">
              <Link className="nav-link px-3 rounded hover-bg" to="/jobs">
                <i className="bi bi-search me-1"></i> Offerte
              </Link>
            </li>

            {user?.role === 'CANDIDATE' && (
              <>
                <li className="nav-item mx-1">
                  <Link className="nav-link px-3 rounded hover-bg" to="/saved">
                    <i className="bi bi-bookmark-heart me-1"></i> Salvate
                  </Link>
                </li>
                <li className="nav-item mx-1">
                  <Link className="nav-link px-3 rounded hover-bg" to="/applications">
                    <i className="bi bi-send-check me-1"></i> Candidature
                  </Link>
                </li>
              </>
            )}

            {user?.role === 'RECRUITER' && (
              <>
                <li className="nav-item mx-1">
                  <Link className="nav-link px-3 rounded hover-bg" to="/post-job">
                    <i className="bi bi-plus-circle me-1"></i> Pubblica
                  </Link>
                </li>
                <li className="nav-item mx-1">
                  <Link className="nav-link px-3 rounded hover-bg" to="/dashboard">
                    <i className="bi bi-speedometer2 me-1"></i> Dashboard
                  </Link>
                </li>
              </>
            )}
          </ul>

          <div className="d-flex align-items-center gap-2">
            {user ? (
              <div className="dropdown">
                <button 
                  className="btn btn-light dropdown-toggle d-flex align-items-center gap-2 fw-semibold" 
                  type="button" 
                  data-bs-toggle="dropdown"
                >
                  <div 
                    className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" 
                    style={{ width: '32px', height: '32px', fontSize: '14px' }}
                  >
                    {user.firstName?.charAt(0).toUpperCase()}
                  </div>
                  <span className="d-none d-lg-inline">{user.firstName}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
                  <li>
                    <Link className="dropdown-item py-2" to="/profile">
                      <i className="bi bi-person me-2 text-primary"></i> Profilo
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item py-2 text-danger" onClick={logout}>
                      <i className="bi bi-box-arrow-right me-2"></i> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-light fw-semibold px-4">
                  Login
                </Link>
                <Link to="/register" className="btn btn-warning fw-semibold px-4 text-dark">
                  Registrati
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}