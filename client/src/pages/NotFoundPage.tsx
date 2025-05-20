import type { NotFoundPageProps } from "../types";
import { Link } from "react-router";

const NotFoundPage = ({ message }: NotFoundPageProps) => {
  return (
    <div className="flex min-h-[70dvh] flex-col items-center justify-center gap-4">
      <section className="flex flex-col gap-1 text-center">
        <h2>404 - Error</h2>
        <h1 className="text-xl font-semibold uppercase">Page not found</h1>
        <p className="text-lg">{message}</p>
      </section>

      <Link
        to="/"
        className="rounded-xl bg-blue-400 p-2 text-white transition-all duration-200 hover:bg-blue-400/80"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
