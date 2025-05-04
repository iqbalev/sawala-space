import { createBrowserRouter } from "react-router";
import App from "./App";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ProfilePage, {
  UserAbout,
  UserArticles,
  UserComments,
} from "./pages/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/sign-up", element: <SignUpPage /> },
      { path: "/sign-in", element: <SignInPage /> },
      {
        path: "/profile",
        element: <ProfilePage />,
        children: [
          { index: true, element: <UserAbout /> },
          { path: "about", element: <UserAbout /> },
          { path: "articles", element: <UserArticles /> },
          { path: "comments", element: <UserComments /> },
        ],
      },
    ],
  },
]);

export default router;
