import { useContext, useState } from "react";
import { SvgComment } from "../../assets/Comment";
import { ExpandIcon } from "../../assets/ExpandIcon";
import { Heart } from "../../assets/Heart";
import Comment from "../Comment";
import "./style.css";
import { PenSvg } from "../../assets/PenSvg";
import Input from "../Input";
import Button from "../Button";
import FrameWrapper from "../FrameWrapper";
import { AuthContext } from "../../AuthProvider";
import type { IComment, IPost } from "../../TestConsts";
import React from "react";

interface PostProps {
  post: IPost;
  onAddComment: (postId: string, comment: IComment) => void;
}

function Post({ post, onAddComment }: PostProps) {
  const {
    user,
    postId,
    postImg,
    postTitle,
    postDescription,
    likes,
    comments,
    postedAt,
  }: IPost = post;

  const { userId } = useContext(AuthContext);

  const [isCommentsExpanded, setIsCommentsExpanded] = useState(false);
  const [comment, setComment] = useState("");

  const handleExpand = () => {
    setIsCommentsExpanded((prev) => !prev);
  };

  const handleAddComment = () => {
    if (comment) {
      onAddComment(postId, {
        commentID: comments.length + 1,
        description: comment,
        user,
      });
    }

    setComment("");
  };

  return (
    <article className="post">
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
            <Heart /> <span>{likes} likes</span>
          </div>
          <div className="comments">
            <SvgComment />
            {userId ? (
              <span>{comments.length} comments</span>
            ) : (
              <span>You have to login to see the comments </span>
            )}
            {userId && (
              <button className="expand-button" onClick={handleExpand}>
                <ExpandIcon
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
        {userId && isCommentsExpanded && (
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
        {userId && (
          <div className="add-comment">
            <Input
              id="comment"
              description="Add a comment"
              name="comment"
              placeholder="Write description here..."
              type="text"
              Icon={PenSvg}
              value={comment}
              onInput={(comment) => setComment(comment)}
            />
            <Button
              description="Add a comment"
              onButtonClick={handleAddComment}
            />
          </div>
        )}
      </FrameWrapper>
    </article>
  );
}

export default React.memo(Post);

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
