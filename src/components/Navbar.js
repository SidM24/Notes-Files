import { React } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"

import logo from '../Images/logo.png'


const Navbar = () => {
    let location = useLocation();
    let navigate = useNavigate();

    const userSessionToken = localStorage.getItem('token')

    const handleLogout = (e) => {
        localStorage.removeItem('token')
        navigate("/login")
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ padding: '0px', height: '8vh' }}>
                <div className="container-fluid" style={{ justifyContent: 'center' }}>
                    <Link className="navbar-brand" to="/" style={{ margin: '0px', padding: '0px' }}>
                        <img src={logo} alt='Task Pulse' style={{ maxHeight: '7.8vh', borderRadius: '1rem' }} />
                    </Link>
                    {!localStorage.getItem('token') ? <></> :
                        <>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    {userSessionToken && (
                                        <>
                                            <li className="nav-item">
                                                <Link className={`nav-link ${location.pathname === "/home" || location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/home" style={{ fontFamily: 'monospace', fontSize: '1.5rem', marginLeft: '1rem' }}>MyNotes</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} aria-current="page" to="/about" style={{ fontFamily: 'monospace', fontSize: '1.5rem', marginLeft: '1rem' }}>MyFiles</Link>
                                            </li>

                                        </>
                                    )}
                                </ul>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Action
                                    </button>
                                    <div className="dropdown-menu">
                                        <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                                        <button className="dropdown-item" >UserDetails</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </nav>
        </div>
    )
}

export default Navbar
