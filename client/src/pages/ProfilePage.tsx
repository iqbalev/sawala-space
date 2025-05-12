import { useParams, useLocation, useOutletContext } from "react-router";
import { useState, useEffect } from "react";
import type { UserProfile, UserResponse } from "../types";
import { UserIconBig } from "../components/Icons";
import { formatDate } from "../utils";
import { NavLink, Outlet } from "react-router";
import LoadingScreen from "../components/LoadingScreen";
import NotFoundPage from "./NotFoundPage";

const ProfilePage = () => {
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(null);
  const location = useLocation();

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/${userId}`,
        );

        const data: UserResponse = await response.json();
        if (!response.ok) {
          console.log(data.message);
          setUser(null);
        } else {
          setUser(data.user);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getUserProfile();
  }, [userId]);

  if (isLoading) return <LoadingScreen />;
  if (!user) {
    return (
      <NotFoundPage message="The user you’re looking for doesn’t exist. It might have been moved or the URL could be incorrect." />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-col items-center gap-2 sm:flex-row">
        <UserIconBig />
        <div className="flex flex-col items-center sm:items-baseline">
          <p className="text-xl font-semibold">{user.name}</p>
          <p>Joined on {formatDate(user.createdAt)}</p>
        </div>
      </section>

      <nav className="flex justify-center gap-2 border-b-2 border-gray-100 sm:justify-start">
        <NavLink
          to="about"
          className={({ isActive }) =>
            `px-2 py-1 ${
              location.pathname === `/profile/${userId}` || isActive
                ? "border-b-2 border-blue-400"
                : ""
            }`
          }
        >
          About
        </NavLink>

        <NavLink
          to="articles"
          className={({ isActive }) =>
            `border-l-0 px-2 py-1 ${
              isActive ? "border-b-2 border-blue-400" : ""
            }`
          }
        >
          Articles
        </NavLink>

        <NavLink
          to="comments"
          className={({ isActive }) =>
            `border-l-0 px-2 py-1 ${
              isActive ? "border-b-2 border-blue-400" : ""
            }`
          }
        >
          Comments
        </NavLink>
      </nav>

      <Outlet context={{ user }} />
    </div>
  );
};

export const UserAbout = () => {
  const { user } = useOutletContext<{ user: UserProfile }>();

  return (
    <section className="flex justify-center sm:justify-start">
      <p>{user.bio || "There's nothing here yet."}</p>
    </section>
  );
};

export const UserArticles = () => {
  return (
    <section className="flex justify-center sm:justify-start">
      <p>There's nothing here yet.</p>
    </section>
  );
};

export const UserComments = () => {
  return (
    <section className="flex justify-center sm:justify-start">
      <p>There's nothing here yet.</p>
    </section>
  );
};

export default ProfilePage;
