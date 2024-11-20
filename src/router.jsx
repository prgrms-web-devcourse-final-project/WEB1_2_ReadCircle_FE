import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";
import MainPage from "./pages/MainPage";
import PostCreatePage from "./pages/PostCreatePage";

const routes = [
    { path: '/', element: <MainPage /> },
    { path: '/join', element: <JoinPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/write', element: <PostCreatePage />}
]

export default routes;