import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
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
  <Route
    path="/"
    element={authUser ? <ChatPage /> : <Navigate to="/login" />}
  />

  <Route
    path="/login"
    element={authUser ? <Navigate to="/" /> : <LoginPage />}
  />

  <Route
    path="/register"
    element={authUser ? <Navigate to="/" /> : <SignUpPage />}
  />

  <Route
    path="/profile"
    element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
  />
</Routes>
      <Toaster />
    </div>
  );
}

export default App;
