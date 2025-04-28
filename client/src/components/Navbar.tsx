import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";

const Navbar = () => {
  const { isAuthenticated, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="flex items-center justify-between relative">
      <Link to="/" className="text-2xl font-semibold">
        SawalaSpace
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-8 sm:items-center">
        {isAuthenticated ? (
          <li>
            <button
              onClick={() => {
                signOut();
                navigate("/sign-in");
              }}
              type="button"
              className="hover:text-blue-400 hover:underline hover:underline-offset-6 transition-all duration-100"
            >
              Sign Out
            </button>
          </li>
        ) : (
          <>
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
          </>
        )}
      </ul>

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
        {isMobileMenuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
    </nav>
  );
};

export default Navbar;
