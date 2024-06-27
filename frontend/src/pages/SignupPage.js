import React from 'react';
import SignupForm from '../Components/SignupForm';
import styled from 'styled-components';

const SignupPage = () => {
    return (
        <SignupPageContainer>
            <SignupForm />
        </SignupPageContainer>
    );
};

const SignupPageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #ffffff; /* Flat white background */
`;

export default SignupPage;
