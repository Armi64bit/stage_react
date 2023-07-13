import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

interface ErrorResponse {
  error: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: '',
  });
  const [registerError, setRegisterError] = useState('');
  const [showPasswordValidation, setShowPasswordValidation] = useState(false);
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
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response && axiosError.response.data) {
          const errorData = axiosError.response.data;
          setRegisterError(errorData.error);
        } else {
          setRegisterError('An error occurred during registration');
        }
      } else {
        setRegisterError('An error occurred during registration');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setFormData({
      ...formData,
      password,
    });

    const passwordValidationRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    setShowPasswordValidation(!passwordValidationRegex.test(password));
  };

  return (
    <form className='form-signin w-100 m-auto' onSubmit={handleRegister}>
      <div className="patterns">
        <svg width="100%" height="100%">
          <text x="50%" y="60%" text-anchor="middle">
            Sign Up
          </text>
        </svg>
      </div>
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
          onChange={handlePasswordChange}
          required
        />
        <label htmlFor="floatingPassword">Password</label>
        {showPasswordValidation && (
          <p className="text-danger">
            Please match the requested form: Must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long.
          </p>
        )}
      </div>

      {registerError && (
        <div className="alert alert-danger" role="alert">
          {registerError}
        </div>
      )}

      <button className="w-100 btn btn-lg btn-primary" type="submit">
        Sign up
      </button>
    </form>
  );
};

export default Register;