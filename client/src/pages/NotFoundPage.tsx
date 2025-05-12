import type { NotFoundPageProps } from "../types";
import { Link } from "react-router";

const NotFoundPage = ({ message }: NotFoundPageProps) => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[80dvh]">
      <section className="flex flex-col gap-1 text-center">
        <h2>404 - Error</h2>
        <h1 className="text-xl font-semibold uppercase">Page not found</h1>
        <p className="text-lg">{message}</p>
      </section>

      <Link
        to="/"
        className="text-white bg-blue-400 p-2 rounded-xl hover:bg-blue-400/80 transition-all duration-200"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
