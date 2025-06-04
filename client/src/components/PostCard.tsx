import type { PostCardProps } from "../types";
import { Link } from "react-router";
import { formatDate } from "../utils";

const PostCard = ({ post }: PostCardProps) => {
  return (
    <article className="grid grid-rows-[auto_1fr_auto] rounded-xl bg-gray-200">
      <header className="flex flex-col gap-1 border-b border-b-gray-300 p-4">
        <h2 title={post.title} className="line-clamp-3">
          <Link
            to={`/posts/${post.id}`}
            className="text-md inline font-semibold transition-colors hover:text-blue-400"
          >
            {post.title}
          </Link>
        </h2>

        <div className="flex items-center gap-1">
          <span className="text-sm text-black/60">In</span>
          <Link
            to=""
            className="text-sm transition-colors duration-200 first-letter:capitalize hover:text-blue-400"
          >
            {post.category}
          </Link>
          <span className="text-sm text-black/60">by</span>
          <Link
            to={`/profile/${post.authorId}`}
            className="transition-color text-sm duration-200 hover:text-blue-400"
          >
            {post.author.name}
          </Link>
        </div>
      </header>

      <section className="flex flex-col gap-2 p-4">
        <p className="mb-auto line-clamp-4 text-sm leading-relaxed">
          {post.content}
        </p>
        <Link
          to={`/posts/${post.id}`}
          className="transition-color self-end rounded-xl bg-blue-400 px-2 py-1 text-sm text-white duration-200 hover:bg-blue-400/80"
        >
          Continue reading <span>&#10230;</span>
        </Link>
      </section>

      <footer className="flex flex-col items-end border-t border-t-gray-300 p-4 text-sm text-black/60">
        <p>Published on {formatDate(post.createdAt)}</p>
        <p>Updated on {formatDate(post.updatedAt)}</p>
      </footer>
    </article>
  );
};

export default PostCard;
