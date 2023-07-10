import React from 'react';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Login = () => {


  const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [loginError, setLoginError] = useState('');
const navigate = useNavigate();

const submit = async (e: React.SyntheticEvent) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token; // Assuming the API returns a token in the response

      // Store the token in localStorage or any other secure storage
      localStorage.setItem('token', token);

      // Redirect to the desired page or perform any other action
      console.log("Redirecting to /home");

      navigate('/home');

    } else {
      const errorData = await response.json();
      setLoginError(errorData.message);
    }
  } catch (error) {
    console.log(error);
    setLoginError('An error occurred during login');
  }
};

return ( <div >
        <form  onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
    
        <div className="form-floating">
          <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
          onChange={e=>setEmail(e.target.value)}/>
          <label >Email address</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
          onChange={e=>setPassword(e.target.value)}/>
          <label >Password</label>
        </div>
    
       
        <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
      </form>
      </div>
    );
};

export default Login;