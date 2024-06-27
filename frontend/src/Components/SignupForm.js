import React, { useState } from 'react';
import styled from 'styled-components';
import { register } from '../services/authService';

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(username, email, password);
            setSuccessMessage('Registration successful!'); // Display success message
            setUsername(''); // Clear username field
            setEmail(''); // Clear email field
            setPassword(''); // Clear password field
            setError(''); // Clear any previous errors
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <SignupPageContainer>
        <SignupFormContainer>
        <SignupHeader>Signup</SignupHeader> {/* Header */}
            {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>} {/* Success notification */}
            <form onSubmit={handleRegister}>
                <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <Input
                    type="email"
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
                <SignupButton type="submit">Sign Up</SignupButton>
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </form>
            <LoginLink>
                Already have an account? <a href="/login">Click here to login</a> {/* Login link */}
            </LoginLink>
        </SignupFormContainer>
        </SignupPageContainer>
    );
};

const SignupPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative; /* Ensure relative positioning for z-index usage */
`;

const SignupFormContainer = styled.div`
    width: 600px;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const SignupHeader = styled.h2`
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

const SignupButton = styled.button`
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
    margin-top: 10px;
`;

const SuccessMessage = styled.p`
    color: #008000;
    margin-top: 10px;
`;

const LoginLink = styled.p`
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

export default SignupForm;
