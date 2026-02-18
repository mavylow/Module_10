import { useLoaderData, useRevalidator } from "react-router";
import Post from "@components/Post";
import Sidebar from "@components/Sidebar";
import type { IPost } from "@/interfaces";
import CreatePost from "@components/CreatePost";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

function Home() {
  const posts = useLoaderData<IPost[]>();
  const { revalidate } = useRevalidator();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <main className="home">
      {user && <Sidebar />}
      {user && <CreatePost onAdd={revalidate} />}
      {posts
        ?.sort(
          (a, b) =>
            new Date(b.creationDate).getTime() -
            new Date(a.creationDate).getTime()
        )
        .map((post) => (
          <Post key={post.id} post={post} onLike={revalidate} />
        ))}
    </main>
  );
}

export default Home;
