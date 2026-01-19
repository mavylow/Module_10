import { SvgComment } from "./assets/Comment";
import { Heart } from "./assets/Heart";
import "./Post.css";

export interface IUser {
  userId: string;
  profilePhoto: string;
  username: string;
  email: string;
  description?: string;
}
export interface IComment {
  user: IUser;
  description: string;
}
export interface IPost {
  postId: string;
  user: IUser;
  postImg?: string;
  postTitle?: string;
  postDescription?: string;
  likes: number;
  comments: IComment[];
  postedAt: Date;
}

interface PostProps {
  post: IPost;
}

export default function Post({ post }: PostProps) {
  const {
    user,
    postImg,
    postTitle,
    postDescription,
    likes,
    comments,
    postedAt,
  }: IPost = post;

  return (
    <article className="post" aria-braillelabel={`post-title-${post.postId}`}>
      <div className="post-header">
        <img
          src={user.profilePhoto}
          alt={`Profile picture of ${user.username}`}
          className="post-avatar"
          loading="lazy"
        />
        <h2>{user.username}</h2>
        <time
          dateTime={postedAt.toISOString()}
          className="post-timestamp"
          title={postedAt.toLocaleString()}
        >
          {formattedDate(postedAt)}
        </time>
      </div>
      {postImg && (
        <figure>
          <img src={postImg} />
        </figure>
      )}
      <div className="post-text">
        <h3>{postTitle}</h3>
        <p> {postDescription}</p>
      </div>
      <div className="post-info">
        <div className="likes">
          <Heart theme="night" /> <span>{likes} likes</span>
        </div>
        <div className="comments">
          <SvgComment theme="night" />
          <span>You have to login to see the comments </span>
        </div>
      </div>
    </article>
  );
}

function formattedDate(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);

  if (diffSec < 60) return "now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  if (diffWeek < 4) return `${diffWeek}w ago`;

  return date.toLocaleDateString();
}
