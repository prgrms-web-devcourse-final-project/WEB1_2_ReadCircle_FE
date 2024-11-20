import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";
import MainPage from "./pages/MainPage";

const routes = [
  { path: "/", element: <MainPage /> },
  { path: "/join", element: <JoinPage /> },
  { path: "/login", element: <LoginPage /> },
];

export default routes;
