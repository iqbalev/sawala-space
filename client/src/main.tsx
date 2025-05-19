import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext";
import { RouterProvider } from "react-router";
import router from "./routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </AuthProvider>
  </StrictMode>,
);
