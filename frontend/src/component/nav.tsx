import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    // Check if the user is logged in (by checking the token in localStorage)
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      // Fetch the user's username from the server or any other source
      // and set it in the state
      fetchUsername();
    }
  }, []);

  const fetchUsername = async () => {
    try {
      // Make a request to the server to fetch the user's username
      const response = await fetch('http://localhost:5000/api/users/username', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
      } else {
        throw new Error("Unable to fetch username"); // Handle the error case if the username cannot be fetched
      }
    } catch (error) {
      console.log(error);
      // Handle any other errors that occur during the fetch
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic (e.g., remove the token from localStorage)
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/login');
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNav}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ml-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">Logged in as {username}</span>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Log in
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;