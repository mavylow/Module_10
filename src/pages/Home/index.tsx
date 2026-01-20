// import { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Post from "../../components/Post";
import Sidebar from "../../components/Sidebar";
import { POSTS } from "../../TestConsts";

function Home() {
  // const [isAuth, setIsAuth] = useState(true);
  return (
    <>
      <Header />
      <main>
        {true && <Sidebar />}
        {POSTS.map((post) => (
          <Post key={post.postId} post={post} isAuth={true} />
        ))}
      </main>
      <Footer />
    </>
  );
}

export default Home;
