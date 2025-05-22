import type { PostCardProps } from "../types";
import { Link } from "react-router";
import { UserInitialIcon } from "./Icons";
import { formatDate } from "../utils";

const PostCard = ({ post }: PostCardProps) => {
  return (
    <article className="flex flex-col gap-2 rounded-xl bg-gray-200">
      <div className="flex flex-col">
        <div className="flex flex-col gap-[6px] px-4 py-2">
          <Link
            to={`/posts/${post.id}`}
            className="self-start text-lg font-semibold transition-all duration-200 hover:text-blue-400"
          >
            {post.title}
          </Link>

          <div className="flex items-center gap-1">
            <UserInitialIcon userName={post.author.name} size="xs" />
            <Link
              to={`/profile/${post.authorId}`}
              className="text-sm text-black/60 transition-all duration-200 hover:text-blue-400"
            >
              {post.author.name}
            </Link>
          </div>

          <p className="line-clamp-4 overflow-hidden text-sm leading-relaxed text-ellipsis">
            {post.content}
          </p>

          <Link
            to={`/posts/${post.id}`}
            className="self-end rounded-xl bg-blue-400 px-2 py-1 text-sm text-white transition-all duration-200 hover:bg-blue-400/80"
          >
            Continue reading <span>&#10230;</span>
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-end px-4 py-2 text-sm text-black/60">
        <p>Uploaded on {formatDate(post.createdAt)}</p>
        <p>Last updated on {formatDate(post.updatedAt)}</p>
      </div>
    </article>
  );
};

export default PostCard;
