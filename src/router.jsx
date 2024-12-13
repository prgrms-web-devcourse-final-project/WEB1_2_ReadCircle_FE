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
import PaymentPage from "./pages/PaymentPage";
import UserList from "./pages/UserList";
import SaleManagement from "./pages/SaleManagement";
import AdminPage from "./pages/AdminPage";

const routes = [
  { path: "/join", element: <JoinPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/mypage", element: <MyPage /> },
  { path: "/create", element: <PostCreatePage /> },
  { path: "/view/:postId", element: <PostViewPage /> },
  { path: "/edit/:postId", element: <PostEditPage /> },
  { path: "/", element: <MainPage /> },
  { path: "/shop", element: <ShopPage /> },
  { path: "/market", element: <Market /> },
  { path: "/searchresult", element: <SearchResultPage /> },
  { path: "/searchmall/:isbn", element: <SearchMallPage /> },
  { path: "/purchase-create", element: <PurchaseCreatePage /> },
  { path: "/book/:bookId", element: <PurchaseViewPage /> },
  { path: "/cart", element: <CartPage /> },
  { path: "/myview/:postId", element: <MyPostViewPage /> },
  { path: "/payment", element: <PaymentPage /> },
  { path: "/userList", element: <UserList /> },
  { path: "/saleManagement", element: <SaleManagement /> },
  { path: "/adminmanagement", element: <AdminPage /> },
];

export default routes;
