import Post from "./Post";
import { POSTS } from "./TestConsts";

// export default function Home() {
//   return (
//     <>
//       {POSTS.map((post) => (
//         <Post key={post.postId} post={post} />
//       ))}
//     </>
//   );
// }

export default function HomeWithAuth() {
  return (
    <>
      {POSTS.map((post) => (
        <Post key={post.postId} post={post} isAuth={true} />
      ))}
    </>
  );
}
