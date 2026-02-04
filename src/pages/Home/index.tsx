import { useContext, useEffect, useState } from "react";
import Footer from "@components/Footer";
import Header from "@components/Header";
import Post from "@components/Post";
import Sidebar from "@components/Sidebar";
import type { IPost } from "@/TestConsts";
import { AuthContext } from "@/AuthProvider";

function Home() {
  const [posts, setPosts] = useState<IPost[] | []>([]);

  const { user } = useContext(AuthContext);

  // const handleAddComment = (postId: string, comment: IComment) => {
  //   const newPosts = posts.map((post) => {
  //     if (post.postId === postId) {
  //       const newPost: IPost = {
  //         ...post,
  //         comments: [...post.comments, comment],
  //       };
  //       return newPost;
  //     }
  //     return post;
  //   });
  //   setPosts(newPosts);
  // };

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <>
      <Header />
      <main className="home">
        {user && <Sidebar />}
        {posts?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </main>
      <Footer />
    </>
  );
}

export default Home;
