import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";
import MainPage from "./pages/MainPage";
import PostCreatePage from "./pages/PostCreatePage";
import PostViewPage from "./pages/PostViewPage";
import PostEditPage from "./pages/PostEditPage";

const routes = [
    { path: '/', element: <MainPage /> },
    { path: '/join', element: <JoinPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/write', element: <PostCreatePage />},
    { path: '/view', element: <PostViewPage />},
    { path: '/edit', element: <PostEditPage />},
]

export default routes;