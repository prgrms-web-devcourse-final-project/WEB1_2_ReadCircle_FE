import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";
import MyPage from "./pages/MyPage";
import PostCreatePage from "./pages/PostCreatePage";
import PostViewPage from "./pages/PostViewPage";
import PostEditPage from "./pages/PostEditPage";
import MainPage from "./pages/MainPage";
import ShopPage from "./pages/ShopPage";
import Market from "./pages/MarketPage";
import SearchResultPage from "./pages/SearchResultPage";

const routes = [
  { path: "/join", element: <JoinPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/mypage", element: <MyPage /> },
  { path: "/create", element: <PostCreatePage /> },
  { path: "/view", element: <PostViewPage /> },
  { path: "/edit", element: <PostEditPage /> },

  // HareuBang
  { path: "/", element: <MainPage /> },
  { path: "/shop", element: <ShopPage /> },
  { path: "/market", element: <Market /> },
  { path: "/market", element: <Market /> },
  { path: "/searchresult", element: <SearchResultPage /> },
];

export default routes;
