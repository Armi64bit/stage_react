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
        // Handle the error case if the username cannot be fetched
      }
    } catch (error) {
      console.log(error);
      // Handle any other errors that occur during the fetch
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <p>Logged in as {username}</p>
      ) : (
        <p>No one is logged in</p>
      )}
      {/* <p>Home</p> */}
    </div>
  );
};

export default Home;