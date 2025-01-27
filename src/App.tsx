import { Login } from './pages/Login/Login';
import { Profile } from './pages/Profile/Profile';
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './redux/store';
import './App.css';
import { Posts } from './pages/Posts/Posts';

export const App = () => {

  const isAuthenticated = useSelector((state: AppRootStateType) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? (<Navigate to="/profile" replace />) : (<Login />)}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? (<Profile />) : (<Navigate to="/login" replace />)}
        />
        <Route
          path="/posts/:page?"
          element={isAuthenticated ? (<Posts />) : (<Navigate to="/posts/:page?" replace />)}
        />
        <Route
          path="/"
          element={isAuthenticated ? (<Navigate to="/profile" replace />) : (<Navigate to="/login" replace />)}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

