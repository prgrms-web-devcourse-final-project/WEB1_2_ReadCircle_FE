import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";
import MainPage from "./pages/MainPage";
import BookList from "./components/BookList";

const routes = [
  { path: "/", element: <MainPage /> },
  { path: "/join", element: <JoinPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/BookList", element: <BookList /> },
];

export default routes;
