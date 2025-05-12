import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router";
import { UserIconSmall, ChevronIconDown, CloseIcon, BurgerIcon } from "./Icons";

const Navbar = () => {
  const { isAuthenticated, userId, signOut } = useAuth();
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
        {isAuthenticated && userId ? (
          <>
            <button onClick={toggleDropdown} className="flex items-center">
              <UserIconSmall />
              <ChevronIconDown />
            </button>

            {isDropdownOpen && (
              <ul className="absolute top-12 right-0 flex w-40 flex-col border-gray-100 bg-white shadow-sm">
                <li className="w-full transition-all duration-100 hover:bg-blue-400 hover:text-white">
                  <Link
                    onClick={closeDropdown}
                    to={`/profile/${userId}`}
                    className="block p-2"
                  >
                    Profile
                  </Link>
                </li>

                <li className="w-full transition-all duration-100 hover:bg-blue-400 hover:text-white">
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
        <ul className="absolute top-0 flex h-dvh w-11/12 flex-col rounded-xl bg-white text-left text-xl shadow-sm sm:hidden">
          {isAuthenticated && userId ? (
            <>
              <li
                onClick={closeMobileMenu}
                className="border-b border-b-gray-100 transition-all duration-100 hover:rounded-xl hover:bg-gray-100"
              >
                <Link to="/" className="block w-full p-2.5">
                  Home
                </Link>
              </li>

              <li
                onClick={closeMobileMenu}
                className="border-b border-b-gray-100 transition-all duration-100 hover:rounded-xl hover:bg-gray-100"
              >
                <Link to={`/profile/${userId}`} className="block w-full p-2.5">
                  Profile
                </Link>
              </li>

              <li className="border-b border-b-gray-100 transition-all duration-100 hover:rounded-xl hover:bg-gray-100">
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
                className="border-b border-b-gray-100 transition-all duration-100 hover:rounded-xl hover:bg-gray-100"
              >
                <Link to="/" className="block w-full p-2.5">
                  Home
                </Link>
              </li>

              <li
                onClick={closeMobileMenu}
                className="border-b border-b-gray-100 transition-all duration-100 hover:rounded-xl hover:bg-gray-100"
              >
                <Link to="/sign-in" className="block w-full p-2.5">
                  Sign In
                </Link>
              </li>

              <li
                onClick={closeMobileMenu}
                className="border-b border-b-gray-100 transition-all duration-100 hover:rounded-xl hover:bg-gray-100"
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
