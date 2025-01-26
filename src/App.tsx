import { Login } from './pages/Login/Login';
import { Profile } from './pages/Profile/Profile';
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './redux/store';
import './App.css';
import { useEffect } from 'react';

export const App = () => {

  const isAuthenticated = useSelector((state: AppRootStateType) => state.auth.isAuthenticated);
  console.log("isAuthenticated:", isAuthenticated);


  return (
    <HashRouter >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/profile" : "/login"} replace />}
        />
      </Routes>
    </HashRouter >
  );
}

