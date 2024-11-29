import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";
import MainPage from "./pages/MainPage";
import BookListPage from "./pages/BookListPage";
import MyPage from "./pages/MyPage";
import PostCreatePage from "./pages/PostCreatePage";
import PostViewPage from "./pages/PostViewPage";
import PostEditPage from "./pages/PostEditPage";

const routes = [
  { path: "/", element: <MainPage /> },
  { path: "/join", element: <JoinPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/BookList", element: <BookListPage /> },
  { path: "/mypage", element: <MyPage /> },
  { path: "/create", element: <PostCreatePage /> },
  { path: "/view", element: <PostViewPage /> },
  { path: "/edit", element: <PostEditPage /> },
];

export default routes;
