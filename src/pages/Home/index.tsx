// import { useLoaderData, useRevalidator } from "react-router";
import Post from "@components/Post";
import Sidebar from "@components/Sidebar";
import type { IPost } from "@/interfaces";
import CreatePost from "@components/CreatePost";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { loadPosts } from "@/utils/apiUtil";

import CircularProgress from "@mui/material/CircularProgress";
import { useCallback } from "react";

function Home() {
  const {
    isLoading,
    data: posts,
    refetch: refetchPosts,
  } = useQuery<IPost[]>({
    queryKey: ["post"],
    queryFn: loadPosts,
  });

  const user = useSelector((state: RootState) => state.auth.user);

  const handleRefetch = useCallback(() => {
    refetchPosts();
  }, [refetchPosts]);

  if (isLoading) {
    return (
      <main className="home">
        <CircularProgress color="secondary" />
      </main>
    );
  }
  return (
    <main className="home">
      {user && <Sidebar />}
      {user && <CreatePost onAdd={handleRefetch} />}
      {posts
        ?.sort(
          (a, b) =>
            new Date(b.creationDate).getTime() -
            new Date(a.creationDate).getTime()
        )
        .map((post) => (
          <Post key={post.id} post={post} onLike={handleRefetch} />
        ))}
    </main>
  );
}

export default Home;
