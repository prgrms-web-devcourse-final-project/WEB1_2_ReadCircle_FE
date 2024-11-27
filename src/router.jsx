import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";
import MainPage from "./pages/MainPage";
import BookListPage from "./pages/BookListPage";
import PostCreatePage from "./pages/PostCreatePage";
import PostViewPage from "./pages/PostViewPage";
import PostEditPage from "./pages/PostEditPage";
import PurchaseCreatePage from "./pages/PurchaseCreatePage";
import PurchaseViewPage from "./pages/PurchaseViewPage";
import MyPostViewPage from "./pages/MyPostViewPage";

const routes = [
  { path: "/", element: <MainPage /> },
  { path: "/join", element: <JoinPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/BookList", element: <BookListPage /> },
  { path: "/create", element: <PostCreatePage /> },
  { path: "/view", element: <PostViewPage /> },
  { path: "/edit", element: <PostEditPage /> },
  { path: "/purchase-create", element: <PurchaseCreatePage /> },
  { path: "/purchase-view", element: <PurchaseViewPage /> },
  { path: "/myview", element: <MyPostViewPage /> },
];

export default routes;
