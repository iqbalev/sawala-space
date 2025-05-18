import { createBrowserRouter } from "react-router";
import App from "./App";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import {
  ProfilePage,
  ProfilePostsPage,
  ProfileCommentsPage,
} from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "sign-up", element: <SignUpPage /> },
      { path: "sign-in", element: <SignInPage /> },

      {
        path: "profile/:userId",
        element: <ProfilePage />,
        children: [
          { index: true, element: <ProfilePostsPage /> },
          { path: "posts", element: <ProfilePostsPage /> },
          { path: "comments", element: <ProfileCommentsPage /> },
        ],
      },
      {
        path: "*",
        element: (
          <NotFoundPage message="It might have been moved or the URL could be incorrect." />
        ),
      },
    ],
  },
]);

export default router;
