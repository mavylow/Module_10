import Post from "@components/Post";
import Sidebar from "@components/Sidebar";
import type { IPost } from "@/interfaces";
import CreatePost from "@components/CreatePost";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { loadPosts } from "@/utils/apiUtil";
import { Box, Skeleton, Stack } from "@mui/material";
import { useCallback, useMemo } from "react";

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

  const sortedPosts = useMemo(() => {
    if (!posts) return [];
    return [...posts].sort(
      (a, b) =>
        new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
    );
  }, [posts]);

  if (isLoading) {
    return (
      <main className="home">
        {user && <Sidebar />}
        <Box sx={{ width: "100%", maxWidth: 800, mx: "auto", p: 2 }}>
          <Box sx={{ mb: 3 }}>
            <Skeleton variant="rectangular" width="100%" height={100} />
          </Box>

          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </Box>
      </main>
    );
  }
  return (
    <main className="home">
      {user && <Sidebar />}
      {user && <CreatePost onAdd={handleRefetch} />}
      {sortedPosts?.map((post) => (
        <Post key={post.id} post={post} onLike={handleRefetch} />
      ))}
    </main>
  );
}

const PostSkeleton = () => (
  <Box sx={{ width: "100%", mb: 2 }}>
    <Stack spacing={2}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Skeleton variant="circular" width={50} height={50} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="30%" height={24} />
          <Skeleton variant="text" width="20%" height={16} />
        </Box>
      </Box>

      <Skeleton variant="rectangular" width="100%" height={200} />

      <Box>
        <Skeleton variant="text" width="60%" height={28} />
        <Skeleton variant="text" width="100%" height={20} />
        <Skeleton variant="text" width="90%" height={20} />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Skeleton variant="text" width={80} height={24} />
        <Skeleton variant="text" width={100} height={24} />
      </Box>
    </Stack>
  </Box>
);

export default Home;
