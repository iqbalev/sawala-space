import "./index.css";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router";

const App = () => {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-7xl flex-col bg-white">
      <header className="p-4 shadow-sm">
        <Navbar />
      </header>

      <main className="flex-grow p-4 shadow-sm">
        <Outlet />
      </main>

      <footer className="p-4 text-center">
        &copy; 2025 <span className="font-semibold">SawalaSpace</span>. All
        rights reserved.
      </footer>
    </div>
  );
};

export default App;
