import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import Home from "./components/Menu/Home.jsx";
import Root from "./components/Root/Root.jsx";
import Intro from "./components/Intro/Intro.jsx";
import ArticleDetails from "./components/Article/ArticleDetails.jsx";
import NewArticle from "./components/Article/NewArticle.jsx";
import EditArticle, {
  loader as editArticleLoader,
  action as editArticleAction,
} from "./components/Article/EditArticle.jsx";
import Login, { action as loginAction } from "./components/Auth/Login.jsx";
import Logout, { action as logoutAction } from "./components/Auth/Logout.jsx";
import AuthErrorBoundary from "./components/ErrorPages/AuthErrorBoundary.jsx";
import NotFoundBoundary from "./components/ErrorPages/NotFoundBoundary.jsx";

import { queryClient } from "./query_utils/db.js";
import { tokenLoader } from "./query_utils/auth.js";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      loader: tokenLoader,
      id: "root",
      element: <Root />,
      errorElement: <NotFoundBoundary />,
      children: [
        { index: true, element: <Intro /> },
        { path: "intro", element: <Intro /> },
        {
          path: "menu",
          element: <Home />,
          children: [
            {
              path: "login",
              element: <Login />,
              action: loginAction,
              errorElement: <AuthErrorBoundary />,
            },
            {
              path: "logout",
              element: <Logout />,
              action: logoutAction,
            },
          ],
        },
        {
          path: "menu/articles/new",
          element: <NewArticle />,
        },
        {
          path: "menu/articles/:id",
          element: <ArticleDetails />,
          children: [
            {
              path: "edit",
              element: <EditArticle />,
              loader: editArticleLoader,
              action: editArticleAction,
              errorElement: <AuthErrorBoundary />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
