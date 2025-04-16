import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ArticlesListPage from "./pages/ArticlesListPage";
import ArticlePage from "./pages/ArticlePage";
import { loader as articleLoader } from "./DataLoaders";
import Layout from "./Layout";
import NotFoundPage from "./pages/NotFoundPage";
import LogingPage from "./pages/LogingPage";
import CreateAccountPage from "./pages/CreateAccountPage";

const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/articles",
        element: <ArticlesListPage />,
      },
      {
        path: "/articles/:name",
        element: <ArticlePage />,
        loader: articleLoader,
      },
      {
        path: "/login",
        element: <LogingPage />,
      },
      {
        path: "/create-account",
        element: <CreateAccountPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
