import "./index.css";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router";

const App = () => {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-7xl flex-col bg-gray-100">
      <header className="sticky top-0 right-0 left-0 border-b border-gray-200 bg-gray-100 p-8 opacity-95">
        <Navbar />
      </header>

      <main className="flex-grow p-8">
        <Outlet />
      </main>

      <footer className="border-t border-gray-200 p-8 text-center">
        &copy; 2025 <span>SawalaSpace</span>. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
