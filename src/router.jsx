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
import SearchMallPage from "./pages/SearchMallPage";
import PurchaseCreatePage from "./pages/PurchaseCreatePage";
import PurchaseViewPage from "./pages/PurchaseViewPage";
import MyPostViewPage from "./pages/MyPostViewPage";
import CartPage from "./pages/CartPage";

const routes = [
  { path: "/join", element: <JoinPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/mypage", element: <MyPage /> },
  { path: "/create", element: <PostCreatePage /> },
  { path: "/view", element: <PostViewPage /> },
  { path: "/edit", element: <PostEditPage /> },
  { path: "/", element: <MainPage /> },
  { path: "/shop", element: <ShopPage /> },
  { path: "/market", element: <Market /> },
  { path: "/market", element: <Market /> },
  { path: "/searchresult", element: <SearchResultPage /> },
  { path: "/searchmall/:isbn", element: <SearchMallPage /> },
  { path: "/purchase-create", element: <PurchaseCreatePage /> },
  { path: "/purchase-view", element: <PurchaseViewPage /> },
  { path: "/myview", element: <MyPostViewPage /> },
  { path: "/cart", element: <CartPage /> },
];

export default routes;
