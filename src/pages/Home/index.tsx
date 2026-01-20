import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Post from "../../components/Post";
import { POSTS } from "../../TestConsts";

export default function Home() {
  // const [isAuth, setIsAuth] = useState(true);
  return (
    <>
      <Header />
      <main>
        {POSTS.map((post) => (
          <Post key={post.postId} post={post} isAuth={true} />
        ))}
      </main>
      <Footer />
    </>
  );
}
