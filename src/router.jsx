import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";
import MainPage from "./pages/MainPage";
import BookListPage from "./pages/BookListPage";
import MyPage from "./pages/MyPage";

const routes = [
  { path: "/", element: <MainPage /> },
  { path: "/join", element: <JoinPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/BookList", element: <BookListPage /> },
  { path: "/mypage", element: <MyPage /> },
];

export default routes;
