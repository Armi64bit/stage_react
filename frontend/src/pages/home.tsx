import React, { useState, useEffect } from 'react';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check if the user is logged in (e.g., by checking the token in localStorage)
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      // Fetch the user's username from the server or any other source
      // and set it in the state
      const storedusername = localStorage.getItem("username");
      if (storedusername) {
        setUsername(storedusername);
      }
    }
  }, []);

  

  return (
    <div>
      {isLoggedIn ? (
        <p>Logged in as  {username && (
          <strong>
            {username.charAt(0).toUpperCase() + username.slice(1)}
          </strong>
        )}</p>
      ) : (
        <p>No one is logged in</p>
      )}
      {/* <p>Home</p> */}
    </div>
  );
};

export default Home;