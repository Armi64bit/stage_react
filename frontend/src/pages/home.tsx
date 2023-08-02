import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../styles/Home.css"; // Import the CSS file for styling (create Home.css in the same directory)

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Check if the user is logged in (e.g., by checking the token in localStorage)
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      // Fetch the user's username from the server or any other source
      // and set it in the state
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, []);

  return (
    <div className="landing-page">
      <header>
        <h1>Welcome Home</h1>
      </header>
      <main>
        <div className="content">
          {isLoggedIn ? (
            <p style={{ color: 'white' }}>
              Logged in as{" "}
              {username && (
                <strong>
                  {username.charAt(0).toUpperCase() + username.slice(1)}
                </strong>
              )}
            </p>
          ) : (
            <p
            style={{ color: 'white' }}>
              You are not connected. Please{" "}
              <Link to="/login">Log In</Link>.
            </p>
          )}
        </div>
      </main>
      <footer>
      If you dont already have an account please {" "} 
              <Link to="/register">register</Link> here
      </footer>
    </div>
  );
};

export default Home;
