import type { Post, PostsResponse } from "../types";
import { useSearchParams, Link } from "react-router";
import { useState, useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";
import Message from "../components/Message";
import PostCard from "../components/PostCard";

const PostsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const page = parseInt(searchParams.get("page") || "1");
  const sort = searchParams.get("sort") || "createdAt";
  const order = searchParams.get("order") || "desc";
  const limit = parseInt(searchParams.get("limit") || "10");

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsLoading(true);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("sort", event.target.value);
      params.set("page", "1");
      return params;
    });
  };

  const handleOrder = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsLoading(true);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("order", event.target.value);
      params.set("page", "1");
      return params;
    });
  };

  const handleLimit = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsLoading(true);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("limit", event.target.value);
      params.set("page", "1");
      return params;
    });
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/posts?page=${page}&sort=${sort}&order=${order}&limit=${limit}`,
        );
        const data: PostsResponse = await response.json();
        if (!response.ok) {
          setPosts(null);
          setError(data.message);
        } else {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setTotalPages(data.totalPages);
        }
      } catch (error) {
        setError("Failed to load page. Please try again.");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getPosts();
  }, [page, sort, order, limit]);

  if (isLoading) return <LoadingScreen className="min-h-[70dvh]" />;
  if (error) return <Message message={error} className="min-h-[70dvh]" />;
  if (!posts || posts.length === 0) {
    return (
      <Message message="There's nothing here yet." className="min-h-[70dvh]" />
    );
  }

  return (
    <div className="flex flex-col">
      <section className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold">Latest Posts</h1>

        <section className="flex justify-between gap-2 sm:items-center">
          <p>
            {totalPosts} {totalPosts === 1 ? "post" : "posts"} available
          </p>

          <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-6">
            <select
              name="sort"
              value={sort}
              onChange={handleSort}
              className="rounded-xl bg-gray-200 px-2 py-1 text-sm"
            >
              <option value="createdAt">Date Published</option>
              <option value="updatedAt">Last Updated</option>
              <option value="title">Title</option>
            </select>

            <select
              name="order"
              value={order}
              onChange={handleOrder}
              className="rounded-xl bg-gray-200 px-2 py-1 text-sm"
            >
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>

            <select
              name="limit"
              value={limit}
              onChange={handleLimit}
              className="rounded-xl bg-gray-200 px-2 py-1 text-sm"
            >
              <option value="5">5 posts</option>
              <option value="10">10 posts</option>
              <option value="15">15 posts</option>
              <option value="20">20 posts</option>
            </select>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>

        <nav className="flex items-center justify-end gap-3 text-sm">
          {page > 1 && (
            <Link
              to={`?page=${page - 1}&sort=${sort}&order=${order}&limit=${limit}`}
              className="rounded-xl bg-gray-200 px-2 py-1 transition-colors duration-200 hover:bg-gray-300"
            >
              Prev
            </Link>
          )}

          <p>
            Page {page} of {totalPages} ({totalPosts}{" "}
            {totalPosts === 1 ? "post" : "posts"})
          </p>

          {page < totalPages && (
            <Link
              to={`?page=${page + 1}&sort=${sort}&order=${order}&limit=${limit}`}
              className="rounded-xl bg-gray-200 px-2 py-1 transition-colors duration-200 hover:bg-gray-300"
            >
              Next
            </Link>
          )}
        </nav>
      </section>
    </div>
  );
};

export default PostsPage;
