import { Route, Routes, useNavigate } from 'react-router'
import './App.css'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react';
import { useAuthStore } from './store/useAuthStore';
import { Loader } from 'lucide-react';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div>
        <Loader className="size-5 animate-spin" />
      </div>
    );
  }
  return (
    <div>
      <Routes>
        <Route path="/" element={authUser? <ChatPage /> : navigate("/login")} />
        <Route path="/login" element={authUser? navigate("/") : <LoginPage />} />
        <Route path="/register" element={authUser? navigate("/") :<SignUpPage />} />
        <Route path="/profile" element={authUser? <ProfilePage /> : navigate("/login")} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App
             