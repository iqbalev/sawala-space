import { useParams, useLocation, Outlet, Link } from "react-router";
import { useState, useEffect } from "react";
import type {
  User,
  UserResponse,
  Post,
  PostsResponse,
  Comment,
  CommentsResponse,
} from "../types";
import { UserInitialIcon } from "../components/Icons";
import { formatDate } from "../utils";
import { NavLink } from "react-router";
import LoadingScreen from "../components/LoadingScreen";
import NotFoundPage from "./NotFoundPage";
import Message from "../components/Message";
import PostCard from "../components/PostCard";

export const ProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/${userId}`,
        );

        const data: UserResponse = await response.json();
        if (!response.ok) {
          setError(data.message);
          setUser(null);
        } else {
          setUser(data.user);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to load page. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, [userId]);

  if (isLoading) return <LoadingScreen />;
  if (!user) {
    return (
      <NotFoundPage message="The user you’re looking for doesn’t exist. It might have been moved or the URL could be incorrect." />
    );
  }

  if (error) return <Message message={error} />;

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col items-center gap-3 sm:flex-row">
        <UserInitialIcon userName={user.name} size="xl" />
        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
          <p className="text-xl font-semibold">{user.name}</p>
          <p>{user.bio}</p>
          <p className="text-sm text-black/60">
            Joined on {formatDate(user.createdAt)}
          </p>
        </div>
      </section>

      <nav>
        <ul className="flex justify-center sm:justify-start">
          <li>
            <NavLink
              to="posts"
              className={({ isActive }) =>
                `rounded-s-xl px-4 py-1 ${
                  location.pathname === `/profile/${userId}` || isActive
                    ? "bg-blue-400 text-white"
                    : "bg-gray-200 text-black transition-all duration-300 hover:bg-gray-300"
                }`
              }
            >
              Posts
            </NavLink>
          </li>

          <li>
            <NavLink
              to="comments"
              className={({ isActive }) =>
                `rounded-e-xl px-4 py-1 ${isActive ? "bg-blue-400 text-white" : "bg-gray-200 text-black transition-all duration-300 hover:bg-gray-300"}`
              }
            >
              Comments
            </NavLink>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
};

export const ProfilePostsPage = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/${userId}/posts`,
        );

        const data: PostsResponse = await response.json();
        if (!response.ok) {
          setError(data.message);
          setPosts(null);
        } else {
          setPosts(data.posts);
        }
      } catch (error) {
        setError("Failed to load page. Please try again.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getPosts();
  }, [userId]);

  if (isLoading) return <LoadingScreen />;
  if (error) return <Message message={error} />;
  if (!posts || posts.length === 0) {
    return <Message message="There's nothing here yet." />;
  }

  return (
    <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
      {posts
        .filter((post) => post.published)
        .map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
    </section>
  );
};

export const ProfileCommentsPage = () => {
  const { userId } = useParams();
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/${userId}/comments`,
        );

        const data: CommentsResponse = await response.json();
        if (!response.ok) {
          setError(data.message);
          setComments(null);
        } else {
          setComments(data.comments);
        }
      } catch (error) {
        setError("Failed to load page. Please try again.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getComments();
  }, [userId]);

  if (isLoading) return <LoadingScreen />;
  if (error) return <Message message={error} />;
  if (!comments || comments.length === 0) {
    return <Message message="There's nothing here yet." />;
  }

  return (
    <section className="flex flex-col justify-center gap-6 sm:justify-start">
      {comments.map((comment) => (
        <article key={comment.id} className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <span className="hidden text-sm text-black/60 sm:inline">
              Commented on
            </span>
            <span className="hidden text-sm text-black/60 sm:inline">
              &mdash;
            </span>
            <Link
              to={`/posts/${comment.postId}`}
              className="font-semibold transition-all duration-200 hover:text-blue-400"
            >
              {comment.post.title}
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 text-sm text-black/60">
              <UserInitialIcon userName={comment.user.name} size="xs" />
              <Link
                to={`/profile/${comment.userId}`}
                className="transition-all duration-200 hover:text-blue-400"
              >
                {comment.user.name}
              </Link>
              <span className="text-xs">&bull;</span>
              <span>{formatDate(comment.createdAt)}</span>
            </div>

            <div className="flex rounded-xl bg-gray-200 px-4 py-2">
              <p className="line-clamp-3 overflow-hidden text-sm leading-relaxed text-ellipsis text-black/80">
                {comment.content}
              </p>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};
