import "./index.css";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router";

const App = () => {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-7xl flex-col bg-gray-100">
      <header className="p-4">
        <Navbar />
      </header>

      <main className="flex-grow p-4">
        <Outlet />
      </main>

      <footer className="p-4 text-center">
        &copy; 2025 <span>SawalaSpace</span>. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
