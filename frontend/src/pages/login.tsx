import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

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
        const token = data.token;

        // Store the token in localStorage or any other secure storage
        localStorage.setItem('token', token);

        // Redirect to the desired page or perform any other action
        console.log("Redirecting to /home");

        navigate('/home');
      } else {
        const errorData = await response.json();
        setLoginError(errorData.error);
      }
    } catch (error) {
      console.log(error);
      setLoginError('An error occurred during login');
    }
  };

  return (
    <div className='form-signin w-100 m-auto'>
      <form onSubmit={submit}>
       
        <div className="patterns">
  <svg width="100%" height="100%">
  
 <text x="50%" y="60%"  text-anchor="middle"  >
  Log In
 </text>
 </svg>
</div>
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            onChange={e => setEmail(e.target.value)}
          />
          <label>Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />
          <label>Password</label>
        </div>
        {loginError && <Alert className="text-danger">{loginError}</Alert>}
        
        <button className="btn btn-primary w-100 py-2" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
