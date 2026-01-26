import { useContext, useState } from "react";
import { SvgComment } from "@assets/Comment";
import { ExpandIcon } from "@assets/ExpandIcon";
import { Heart } from "@assets/Heart";
import Comment from "@components/Comment";
import "./style.css";
import { PenSvg } from "@assets/PenSvg";
import Input from "@components/Input";
import Button from "@components/Button";
import FrameWrapper from "@components/FrameWrapper";
import { AuthContext } from "@/AuthProvider";
import type { IComment, IPost } from "@/TestConsts";
import { formattedDate } from "@utils/dateFormatter";
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
              onInput={(e) => setComment(e.target.value)}
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
