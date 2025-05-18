import { useParams, useLocation, Outlet, Link } from "react-router";
import { useState, useEffect } from "react";
import type {
  UserAbout,
  UserAboutResponse,
  UserPosts,
  UserPostsResponse,
  UserComments,
  UserCommentsResponse,
} from "../types";
import { UserIconBig, UserIconExtraSmall } from "../components/Icons";
import { formatDate } from "../utils";
import { NavLink } from "react-router";
import LoadingScreen from "../components/LoadingScreen";
import NotFoundPage from "./NotFoundPage";
import Message from "../components/Message";

export const ProfilePage = () => {
  const { userId } = useParams();
  const [about, setAbout] = useState<UserAbout | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const getUserAbout = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/${userId}`,
        );

        const data: UserAboutResponse = await response.json();
        if (!response.ok) {
          setError(data.message);
          setAbout(null);
        } else {
          setAbout(data.user);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to load page. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    getUserAbout();
  }, [userId]);

  if (isLoading) return <LoadingScreen />;
  if (!about) {
    return (
      <NotFoundPage message="The user you’re looking for doesn’t exist. It might have been moved or the URL could be incorrect." />
    );
  }

  if (error) return <Message message={error} />;

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col items-center gap-2 sm:flex-row">
        <UserIconBig />
        <div className="flex flex-col items-center sm:items-baseline">
          <p className="text-xl font-semibold">{about.name}</p>
          <p>{about.bio}</p>
          <p className="text-black/60">
            Joined on {formatDate(about.createdAt)}
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
  const [posts, setPosts] = useState<UserPosts[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserPosts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/${userId}/posts`,
        );

        const data: UserPostsResponse = await response.json();
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

    getUserPosts();
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
          <article
            key={post.id}
            className="flex flex-col gap-2 rounded-xl bg-gray-200"
          >
            <div className="flex flex-col">
              <div className="flex flex-col gap-[6px] px-4 py-2">
                <Link
                  to={`/posts/${post.id}`}
                  className="self-start text-lg font-semibold transition-all duration-200 hover:text-blue-400"
                >
                  {post.title}
                </Link>

                <div className="flex items-center gap-1">
                  <UserIconExtraSmall />
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
                  className="self-end rounded-xl bg-blue-400 px-2 py-1 text-sm text-white transition-all duration-100 hover:bg-blue-400/80"
                >
                  Continue reading <span>&#10230;</span>
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-end px-4 py-2 text-xs text-black/60">
              <p>Uploaded on {formatDate(post.createdAt)}</p>
              <p>Last updated on {formatDate(post.updatedAt)}</p>
            </div>
          </article>
        ))}
    </section>
  );
};

export const ProfileCommentsPage = () => {
  const { userId } = useParams();
  const [comments, setComments] = useState<UserComments[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserComments = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/${userId}/comments`,
        );

        const data: UserCommentsResponse = await response.json();
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

    getUserComments();
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
            <span className="text-sm text-black/60">Commented on</span>
            <span className="text-sm text-black/60">&mdash;</span>
            <Link
              to={`/posts/${comment.postId}`}
              className="font-semibold transition-all duration-200 hover:text-blue-400"
            >
              {comment.post.title}
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 text-sm text-black/60">
              <UserIconExtraSmall />
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
