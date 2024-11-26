import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Products from "./components/Products";
import Header from "./components/Header";
import CartPage from "./components/CartPage";
import { DataProvider } from "./components/context";
import Todos from "./components/todos";
import Blogs from "./components/Blogs";

function App() {
  const routes = [
    {
      path: "/",
      element: (
        <>
          <Header /> <Products />
        </>
      ),
    },
    {
      path: "/cart",
      element: (
        <>
          <Header /> <CartPage />
        </>
      ),
    },
    {
      path: "/todos",
      element: (
        <>
          <Header /> <Todos />
        </>
      ),
    },
    {
      path: "/posts",
      element: (
        <>
          <Header /> <Blogs />
        </>
      ),
    },
  ];

  const router = createBrowserRouter(routes, {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  });

  return (
    <DataProvider>
      <RouterProvider router={router}></RouterProvider>
    </DataProvider>
  );
}

export default App;
