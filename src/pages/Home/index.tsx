import { useContext, useEffect, useState } from "react";
import Footer from "@components/Footer";
import Header from "@components/Header";
import Post from "@components/Post";
import Sidebar from "@components/Sidebar";
import type { IPost } from "@/TestConsts";
import { AuthContext } from "@/AuthProvider";
import { fetchData } from "@/apiUtil";
import CreatePost from "@/components/CreatePost";

function Home() {
  const [posts, setPosts] = useState<IPost[] | []>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const posts = await fetchData("/api/posts", "GET");
    setPosts(posts);
  };

  return (
    <>
      <Header />
      <main className="home">
        {user && <Sidebar />}
        {user && <CreatePost onAdd={loadPosts} />}
        {posts?.map((post) => (
          <Post key={post.id} post={post} onLike={loadPosts} />
        ))}
      </main>
      <Footer />
    </>
  );
}

export default Home;
