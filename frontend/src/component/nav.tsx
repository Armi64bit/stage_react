import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    // Check if the user is logged in (by checking the token in localStorage)
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      // Fetch the user's username from the server or any other source
      // and set it in the state
      // fetchUsername();
      const storedusername = localStorage.getItem("username");
      if (storedusername) {
        setUsername(storedusername);
      }

    }
  }, []);

  
// const  usernamestored= localStorage.getItem("name"); 


  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic (e.g., remove the token from localStorage)
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUsername("");
    navigate("/login");
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
        <button className="navbar-toggler" type="button" onClick={toggleNav}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}>
          <ul className="navbar-nav ml-auto">
            {isLoggedIn ? (
              <>
               <li className="nav-item">
                  <Link className="nav-link" to="/notes">
                    Notes{" "}
                  </Link>
                </li>
                <li className="nav-item">
                   <span className="nav-link">
    {username && username.charAt(0).toUpperCase() + username.slice(1)}
  </span>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link"
                    onClick={handleLogout}
                  >
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
