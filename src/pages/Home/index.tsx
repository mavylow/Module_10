import { useContext } from "react";
import { useLoaderData, useRevalidator } from "react-router";
import Post from "@components/Post";
import Sidebar from "@components/Sidebar";
import type { IPost } from "@/interfaces";
import { AuthContext } from "@providers/AuthProvider";
import CreatePost from "@components/CreatePost";

function Home() {
  const posts = useLoaderData<IPost[]>();
  const { revalidate } = useRevalidator();
  const { user } = useContext(AuthContext);

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
