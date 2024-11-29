import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "./router";

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
