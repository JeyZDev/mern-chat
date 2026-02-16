import LoginPage from "../pages/LoginPage";
import { createBrowserRouter, Navigate } from "react-router";
import SignUpPage from "../pages/SignUpPage";
import ChatPage from "../pages/ChatPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/" />
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
]);

export default router;