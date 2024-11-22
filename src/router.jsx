import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";
import MainPage from "./pages/MainPage";
<<<<<<< HEAD

const routes = [
    { path: '/', element: <MainPage /> },
    { path: '/join', element: <JoinPage /> },
    { path: '/login', element: <LoginPage /> }
]

export default routes;
=======
import BookListPage from "./pages/BookListPage";

const routes = [
  { path: "/", element: <MainPage /> },
  { path: "/join", element: <JoinPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/BookList", element: <BookListPage /> },
];

export default routes;
>>>>>>> d43711b325b6b88c5c9517e0e43db772ab10f7d5
