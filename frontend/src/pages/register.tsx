import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/signup',
        formData
      );

      // Handle successful registration
      console.log(response.data); 
      navigate('/login');
        } catch (error) {
      // Handle registration error
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleRegister}>
      <h1 className="h3 mb-3 fw-normal">Please Sign up</h1>

      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="floatingUsername"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <label htmlFor="floatingUsername">Username</label>
      </div>

      <div className="form-floating">
        <input
          type="email"
          className="form-control"
          id="floatingEmail"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="floatingEmail">Email</label>
      </div>

      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>

      <button className="w-100 btn btn-lg btn-primary" type="submit">
        Sign up
      </button>
    </form>
  );
};

export default Register;
