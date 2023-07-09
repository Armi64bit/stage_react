import React from 'react';
import { Link } from 'react-router-dom';

const nav = () => {
    return (
       <nav className="navf navbar navbar-expand-md navbar-dark bg-dark mb-4">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Home</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-end" id="navbarCollapse">
  <ul className="navbar-nav">
    <li className="nav-item">
      <Link className="nav-link" to="/login">Log in</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/register">Register</Link>
    </li>
  </ul>
</div>
  </div>
</nav>

    );
};

export default nav;