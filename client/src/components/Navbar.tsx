import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { UserIconSmall, ChevronIconDown, CloseIcon, BurgerIcon } from "./Icons";

const Navbar = () => {
  const { isAuthenticated, signOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const closeDropdown = () => setIsDropdownOpen(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="flex items-center justify-between relative">
      <Link to="/" className="text-2xl font-semibold">
        SawalaSpace
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex relative">
        {isAuthenticated ? (
          <>
            <button onClick={toggleDropdown} className="flex items-center">
              <UserIconSmall />
              <ChevronIconDown />
            </button>

            {isDropdownOpen && (
              <ul className="flex flex-col absolute bg-white top-12 right-0 w-40 shadow-sm border-gray-100">
                <li className="hover:bg-blue-400 hover:text-white transition-all duration-100 w-full">
                  <Link
                    onClick={closeDropdown}
                    to="/profile"
                    className="block p-2"
                  >
                    Profile
                  </Link>
                </li>

                <li className="hover:bg-blue-400 hover:text-white transition-all duration-100 w-full">
                  <button
                    onClick={() => {
                      closeDropdown();
                      navigate("/sign-in");
                      signOut();
                    }}
                    type="button"
                    className="w-full text-left p-2"
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
                className="hover:text-blue-400 hover:underline hover:underline-offset-6 transition-all duration-100"
              >
                Sign In
              </Link>
            </li>

            <li>
              <Link
                to="/sign-up"
                className="hover:text-blue-400 hover:underline hover:underline-offset-6 transition-all duration-100"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <ul className="flex sm:hidden flex-col text-left w-11/12 h-dvh absolute top-0 bg-white text-xl rounded-xl shadow-sm">
          {isAuthenticated ? (
            <>
              <li
                onClick={closeMobileMenu}
                className="hover:bg-gray-100 hover:rounded-xl transition-all duration-100 border-b border-b-gray-100"
              >
                <Link to="/" className="block w-full p-2.5">
                  Home
                </Link>
              </li>

              <li
                onClick={closeMobileMenu}
                className="hover:bg-gray-100 hover:rounded-xl transition-all duration-100 border-b border-b-gray-100"
              >
                <Link to="/profile" className="block w-full p-2.5">
                  Profile
                </Link>
              </li>

              <li className="hover:bg-gray-100 hover:rounded-xl transition-all duration-100 border-b border-b-gray-100">
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
                className="hover:bg-gray-100 hover:rounded-xl transition-all duration-100 border-b border-b-gray-100"
              >
                <Link to="/" className="block w-full p-2.5">
                  Home
                </Link>
              </li>

              <li
                onClick={closeMobileMenu}
                className="hover:bg-gray-100 hover:rounded-xl transition-all duration-100 border-b border-b-gray-100"
              >
                <Link to="/sign-in" className="block w-full p-2.5">
                  Sign In
                </Link>
              </li>

              <li
                onClick={closeMobileMenu}
                className="hover:bg-gray-100 hover:rounded-xl transition-all duration-100 border-b border-b-gray-100"
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
