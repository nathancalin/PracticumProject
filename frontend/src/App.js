// App.js

import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ViewTransactions from './Components/ViewTransactions'; // Import ViewTransactions component
import { MainLayout } from './styles/Layouts';
import styled from 'styled-components';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [active, setActive] = useState(1);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <ViewTransactions />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppStyled>
      <Orb />
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupPage />} />
        {isLoggedIn && (
          <Route
            path="/dashboard/*"
            element={
              <MainLayout>
                <Navigation active={active} setActive={setActive} />
                <Main>
                  {displayData()}
                </Main>
              </MainLayout>
            }
          />
        )}
        <Route path="/transactions" element={<ViewTransactions />} /> {/* Add route for ViewTransactions */}
      </Routes>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
`;

const Main = styled.main`
  flex: 1;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #FFFFFF;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

export default App;
