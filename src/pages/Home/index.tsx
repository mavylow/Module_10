import { useContext, useState } from "react";
import Footer from "@components/Footer";
import Header from "@components/Header";
import Post from "@components/Post";
import Sidebar from "@components/Sidebar";
import { POSTS } from "@/TestConsts";
import type { IComment, IPost } from "@/TestConsts";
import { AuthContext } from "@/AuthProvider";

function Home() {
  const [posts, setPosts] = useState(POSTS);

  const { userId } = useContext(AuthContext);

  const handleAddComment = (postId: string, comment: IComment) => {
    const newPosts = posts.map((post) => {
      if (post.postId === postId) {
        const newPost: IPost = {
          ...post,
          comments: [...post.comments, comment],
        };
        return newPost;
      }
      return post;
    });
    setPosts(newPosts);
  };

  return (
    <>
      <Header />
      <main>
        {userId && <Sidebar />}
        {posts.map((post) => (
          <Post key={post.postId} post={post} onAddComment={handleAddComment} />
        ))}
      </main>
      <Footer />
    </>
  );
}

export default Home;
