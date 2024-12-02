import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import routes from "./router";
import store from "./redux/store";

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
