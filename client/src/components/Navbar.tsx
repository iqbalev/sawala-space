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
import Button from "./Button";

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
            <Button
              label={
                <>
                  <UserInitialIcon userName={user.name} size="sm" />
                  <ChevronDownIcon />
                </>
              }
              type="button"
              onClick={toggleDropdown}
              className="flex items-center"
            />

            <ul
              className={`absolute top-16 right-0 flex min-h-full w-40 flex-col rounded-xl bg-gray-100 shadow-sm transition-all duration-200 ${isDropdownOpen ? "max-h-20 opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}
            >
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
                <Button
                  label="Sign Out"
                  type="button"
                  onClick={() => {
                    closeDropdown();
                    signOut();
                    navigate("/sign-in");
                  }}
                  className="w-full p-2 text-left"
                />
              </li>
            </ul>
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
      <ul
        className={`fixed top-0 left-0 flex min-h-dvh w-full flex-col rounded-xl bg-gray-100 text-left text-lg shadow-sm transition-all duration-200 sm:hidden ${isMobileMenuOpen ? "max-w-[75%] opacity-100" : "max-w-0 overflow-hidden opacity-0"}`}
      >
        {isAuthenticated && user ? (
          <>
            <li
              onClick={closeMobileMenu}
              className="rounded-tr-xl transition-all duration-100 hover:bg-blue-400 hover:text-white"
            >
              <Link to="/" className="block w-full p-8">
                Home
              </Link>
            </li>

            <li
              onClick={closeMobileMenu}
              className="transition-all duration-100 hover:bg-blue-400 hover:text-white"
            >
              <Link to={`/profile/${user.id}`} className="block w-full p-8">
                Profile
              </Link>
            </li>

            <li className="transition-all duration-100 hover:bg-blue-400 hover:text-white">
              <Button
                label="Sign Out"
                type="button"
                onClick={() => {
                  closeMobileMenu();
                  signOut();
                  navigate("/sign-in");
                }}
                className="block w-full p-8 text-left"
              />
            </li>
          </>
        ) : (
          <>
            <li
              onClick={closeMobileMenu}
              className="rounded-tr-xl transition-all duration-100 hover:bg-blue-400 hover:text-white"
            >
              <Link to="/" className="block w-full p-8">
                Home
              </Link>
            </li>

            <li
              onClick={closeMobileMenu}
              className="transition-all duration-100 hover:bg-blue-400 hover:text-white"
            >
              <Link to="/sign-in" className="block w-full p-8">
                Sign In
              </Link>
            </li>

            <li
              onClick={closeMobileMenu}
              className="transition-all duration-100 hover:bg-blue-400 hover:text-white"
            >
              <Link to="/sign-up" className="block w-full p-8">
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>

      <Button
        label={isMobileMenuOpen ? <CloseIcon /> : <BurgerIcon />}
        type="button"
        onClick={toggleMobileMenu}
        className="sm:hidden"
      />
    </nav>
  );
};

export default Navbar;
