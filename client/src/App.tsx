import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DogSearchPage from './pages/DogSearchPage';
import { AuthProvider } from './contexts/AuthContext';
import { FavoritesProvider } from './contexts/FavoritesContext';

const App: React.FC = () => (
  <Router>
    <AuthProvider> {/* ✅ Wrap app with AuthProvider */}
      <FavoritesProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dogs" element={<DogSearchPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </FavoritesProvider>
    </AuthProvider>
  </Router>
);

export default App;
