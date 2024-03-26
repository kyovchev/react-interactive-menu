import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import MenuPage from "./pages/Menu.jsx";
import Root from "./components/Root/Root.jsx";
import IntroPage from "./pages/Intro.jsx";
import ArticleDetailsPage from "./pages/ArticleDetails.jsx";
import NewArticlePage from "./pages/NewArticle.jsx";
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
        { index: true, element: <IntroPage /> },
        { path: "intro", element: <IntroPage /> },
        {
          path: "menu",
          element: <MenuPage />,
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
          element: <NewArticlePage />,
        },
        {
          path: "menu/articles/:id",
          element: <ArticleDetailsPage />,
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
