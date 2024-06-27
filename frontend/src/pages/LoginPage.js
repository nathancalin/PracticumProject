import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom
import authService from '../services/authService';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Attempting to login with:', { email, password });
    try {
      const response = await authService.login(email, password);
      console.log('Login successful, response:', response);
      const { token } = response;
      localStorage.setItem('token', token);
      onLogin();

      // Fetch user details and set username state for Navigation
      const userDetails = await authService.getUserDetails(token);
      setUsername(userDetails.username);

      navigate('/dashboard');
    } catch (error) {
      console.error('Login page error:', error.message);
      setError(error.message || 'Login failed');
    }
  };

  return (
    <LoginPageContainer>
      <LoginFormContainer>
        <LoginForm onSubmit={handleLogin}>
          <LoginHeader>Login</LoginHeader>
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <LoginButton type="submit">Login</LoginButton>
          <SignupLink>
            Don't have an account yet? <Link to="/signup">Click here to signup</Link>
          </SignupLink>
        </LoginForm>
      </LoginFormContainer>
    </LoginPageContainer>
  );
};

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
`;

const LoginFormContainer = styled.div`
  background-color: #ffffff;
  width: 600px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
`;

const LoginForm = styled.form`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const LoginHeader = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #cccccc;
  border-radius: 4px;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4a90e2; /* Warmer blue color */
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #357ebd;
  }
`;

const ErrorMessage = styled.p`
  color: #ff0000;
  margin-bottom: 10px;
`;

const SignupLink = styled.p`
  text-align: center;
  margin-top: 10px;

  a {
    color: #4a90e2;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default LoginPage;
