import { useLocation } from "react-router";
import { UserIconBig } from "../components/Icons";
import { NavLink, Outlet } from "react-router";

const ProfilePage = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-col sm:flex-row items-center gap-2">
        <UserIconBig />
        <div className="flex flex-col items-center sm:items-baseline">
          <p className="text-lg font-semibold">Iqbalev</p>
          <p>Joined on 9 March 2025</p>
        </div>
      </section>

      <nav className="flex justify-center sm:justify-start border-b-2 border-gray-100 gap-2">
        <NavLink
          to="about"
          className={({ isActive }) =>
            `py-1 px-2 ${
              location.pathname === "/profile" || isActive
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
            `border-l-0 py-1 px-2 ${
              isActive ? "border-b-2 border-blue-400" : ""
            }`
          }
        >
          Articles
        </NavLink>

        <NavLink
          to="comments"
          className={({ isActive }) =>
            `border-l-0 py-1 px-2 ${
              isActive ? "border-b-2 border-blue-400" : ""
            }`
          }
        >
          Comments
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
};

export const UserAbout = () => {
  return (
    <section className="flex justify-center sm:justify-start">
      <p>There's nothing here yet (about).</p>
    </section>
  );
};

export const UserArticles = () => {
  return (
    <section className="flex justify-center sm:justify-start">
      <p>There's nothing here yet (articles).</p>
    </section>
  );
};

export const UserComments = () => {
  return (
    <section className="flex justify-center sm:justify-start">
      <p>There's nothing here yet (comments).</p>
    </section>
  );
};

export default ProfilePage;
