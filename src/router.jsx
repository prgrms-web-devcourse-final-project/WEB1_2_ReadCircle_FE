import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";
import MyPage from "./pages/MyPage";
import PostCreatePage from "./pages/PostCreatePage";
import PostViewPage from "./pages/PostViewPage";
import PostEditPage from "./pages/PostEditPage";
import MainPage from "./pages/MainPage";
import BookListPage from "./pages/BookListPage";

const routes = [
  { path: "/join", element: <JoinPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/mypage", element: <MyPage /> },
  { path: "/create", element: <PostCreatePage /> },
  { path: "/view", element: <PostViewPage /> },
  { path: "/edit", element: <PostEditPage /> },

  // HareuBang
  { path: "/", element: <MainPage /> },
  { path: "/BookList", element: <BookListPage /> },
  { path: "/shop", element: <ShopPage /> },
];

export default routes;
