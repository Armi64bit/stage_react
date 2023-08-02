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
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // New state variable
  const navigate = useNavigate();
  const hasUppercase = /^(?=.*[A-Z])/;
  const hasLowercase = /^(?=.*[a-z])/;
  const hasDigit = /^(?=.*\d)/;
  const hasSymbol = /^(?=.*[!@#$%^&*])/;
  const minLength = /^.{8,}$/;
  const [missingConditions, setMissingConditions] = useState<string[]>([]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/signup',
        formData
      );

      // Handle successful registration
      console.log(response.data);
      setRegistrationSuccess(true); // Set registration success state to true
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Delay redirect to login page by 2 seconds
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

    const conditions: string[] = [];
    if (!hasUppercase.test(password)) {
      conditions.push(" one uppercase letter");
    }
    if (!hasLowercase.test(password)) {
      conditions.push(" one lowercase letter");
    }
    if (!hasDigit.test(password)) {
      conditions.push(" one number");
    }
    if (!hasSymbol.test(password)) {
      conditions.push(" one symbol");
    }
    if (!minLength.test(password)) {
      conditions.push("at least 8 characters long");
    }

    setMissingConditions(conditions);
    setShowPasswordValidation(conditions.length > 0);
  };

  return (
    <form className='form-signin w-100 m-auto' onSubmit={handleRegister}>
      <div className="patterns">
        <svg width="100%" height="100%">
          <text x="50%" y="60%" textAnchor="middle">
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
          style={{ color: 'black' }}
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
          style={{ color: 'black' }}
          
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
          style={{ color: 'black' }}
          required
        />
        <label htmlFor="floatingPassword">Password</label>
        {showPasswordValidation && (
  <div className="alert alert-primary" role="alert">
    Please match the requested form: Must contain at least
    {missingConditions.length > 0 ? (
      missingConditions.map((condition, index) => (
        <div key={index}>
          {index > 0 && <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Error:">
  <path
    fill="currentColor"
    d="M16.354 8.354l-4.792 4.792 4.792 4.792a.5.5 0 0 1-.708.708l-4.792-4.792-4.792 4.792a.5.5 0 0 1-.708-.708l4.792-4.792-4.792-4.792a.5.5 0 0 1 .708-.708l4.792 4.792 4.792-4.792a.5.5 0 0 1 .708.708z"
  />
</svg>} {condition}
        </div>
      ))
    ) : (
      <div>
        at least one uppercase letter, one lowercase letter, one number, and one of these symbols "!@#$%^&*"
      </div>
    )}
    
  </div>
)}
      </div>

      {registerError && (
        <div className="alert alert-danger" role="alert">
          {registerError}
        </div>
      )}

      {registrationSuccess && ( // Render the pop-up message if registration success state is true
        <div className="alert alert-success" role="alert">
 <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:">
            <use xlinkHref="#check-circle-fill"/>
          </svg>
          Registered successfully! Redirecting to login page...
        </div>
      )}

      <button className="w-100 btn btn-lg btn-primary" type="submit">
        Sign up
      </button>
    </form>
  );
};

export default Register;
