import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router";
import {
  UserInitialIcon,
  ChevronDownIcon,
  CloseIcon,
  BurgerIcon,
} from "./Icons";

const Navbar = () => {
  const { isAuthenticated, signOut } = useAuth();
  const { user } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  useParams();

  return (
    <nav className="relative flex items-center justify-between">
      <Link to="/" className="text-2xl font-semibold">
        SawalaSpace
      </Link>

      {/* Desktop Menu */}
      <div className="relative hidden sm:flex">
        {isAuthenticated && user ? (
          <>
            <button onClick={toggleDropdown} className="flex items-center">
              <UserInitialIcon userName={user.name} size="sm" />
              <ChevronDownIcon />
            </button>

            {isDropdownOpen && (
              <ul className="absolute top-12 right-0 flex w-40 flex-col rounded-xl bg-gray-100 shadow-sm">
                <li className="w-full rounded-t-xl transition-all duration-100 hover:bg-blue-400 hover:text-white">
                  <Link
                    onClick={closeDropdown}
                    to={`/profile/${user.id}`}
                    className="block p-2"
                  >
                    Profile
                  </Link>
                </li>

                <li className="w-full rounded-b-xl transition-all duration-100 hover:bg-blue-400 hover:text-white">
                  <button
                    onClick={() => {
                      closeDropdown();
                      navigate("/sign-in");
                      signOut();
                    }}
                    type="button"
                    className="w-full p-2 text-left"
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            )}
          </>
        ) : (
          <ul className="flex gap-8 sm:items-center">
            <li>
              <Link
                to="/sign-in"
                className="transition-all duration-100 hover:text-blue-400 hover:underline hover:underline-offset-6"
              >
                Sign In
              </Link>
            </li>

            <li>
              <Link
                to="/sign-up"
                className="transition-all duration-100 hover:text-blue-400 hover:underline hover:underline-offset-6"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <ul className="absolute top-0 flex h-dvh w-10/12 flex-col rounded-xl bg-gray-100 text-left text-lg shadow-sm sm:hidden">
          {isAuthenticated && user ? (
            <>
              <li
                onClick={closeMobileMenu}
                className="rounded-t-xl transition-all duration-100 hover:bg-blue-400 hover:text-white"
              >
                <Link to="/" className="block w-full p-2.5">
                  Home
                </Link>
              </li>

              <li
                onClick={closeMobileMenu}
                className="transition-all duration-100 hover:bg-blue-400 hover:text-white"
              >
                <Link to={`/profile/${user.id}`} className="block w-full p-2.5">
                  Profile
                </Link>
              </li>

              <li className="transition-all duration-100 hover:bg-blue-400 hover:text-white">
                <button
                  onClick={() => {
                    signOut();
                    closeMobileMenu();
                    navigate("/sign-in");
                  }}
                  type="button"
                  className="block w-full p-2.5 text-left"
                >
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li
                onClick={closeMobileMenu}
                className="transition-all duration-100 hover:rounded-xl hover:bg-blue-400 hover:text-white"
              >
                <Link to="/" className="block w-full p-2.5">
                  Home
                </Link>
              </li>

              <li
                onClick={closeMobileMenu}
                className="transition-all duration-100 hover:rounded-xl hover:bg-blue-400 hover:text-white"
              >
                <Link to="/sign-in" className="block w-full p-2.5">
                  Sign In
                </Link>
              </li>

              <li
                onClick={closeMobileMenu}
                className="transition-all duration-100 hover:rounded-xl hover:bg-blue-400 hover:text-white"
              >
                <Link to="/sign-up" className="block w-full p-2.5">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      )}

      <button onClick={toggleMobileMenu} className="sm:hidden">
        {isMobileMenuOpen ? <CloseIcon /> : <BurgerIcon />}
      </button>
    </nav>
  );
};

export default Navbar;
