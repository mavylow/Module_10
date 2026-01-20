import { useState } from "react";
import { SvgComment } from "../../assets/Comment";
import { ExpandIcon } from "../../assets/ExpandIcon";
import { Heart } from "../../assets/Heart";
import Comment from "../Comment";
import "./Post.css";
import { PenSvg } from "../../assets/PenSvg";
import Input from "../Input/Input";
import Button from "../Button/Button";
import FrameWrapper from "../FrameWrapper/FrameWrapper";

export interface IUser {
  userId: string;
  profilePhoto: string;
  username: string;
  email: string;
  description?: string;
}
export interface IComment {
  commentID: number;
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
  isAuth: boolean;
}

export default function Post({ post, isAuth }: PostProps) {
  const {
    user,
    postImg,
    postTitle,
    postDescription,
    likes,
    comments,
    postedAt,
  }: IPost = post;

  const [isCommentsExpanded, setIsCommentsExpanded] = useState<boolean>(false);

  const handleExpand = () => {
    setIsCommentsExpanded((prev) => !prev);
  };

  return (
    <article className="post" aria-braillelabel={`post-title-${post.postId}`}>
      <FrameWrapper>
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
            {isAuth ? (
              <span>{comments.length} comments</span>
            ) : (
              <span>You have to login to see the comments </span>
            )}
            {isAuth && (
              <button className="expand-button" onClick={handleExpand}>
                <ExpandIcon
                  theme="night"
                  style={
                    isCommentsExpanded
                      ? { transform: "rotate(180deg)" }
                      : { transform: "none" }
                  }
                />
              </button>
            )}
          </div>
        </div>
        {isAuth && isCommentsExpanded && (
          <ul className="post-comments">
            {comments.map((comment, i) => (
              <Comment
                key={comment.commentID}
                number={i + 1}
                comment={comment}
              />
            ))}
          </ul>
        )}
        {isAuth && (
          <div className="add-comment">
            <Input
              id="comment"
              description="Add a comment"
              name="comment"
              placeholder="Write description here..."
              type="text"
              Icon={PenSvg}
            />
            <Button description="Add a comment" />
          </div>
        )}
      </FrameWrapper>
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
