import { useContext, useEffect, useState, type ChangeEvent } from "react";
import CommentIcon from "@assets/CommentIcon";
import ChevronIcon from "@assets/ChevronIcon";
import HeartIcon from "@assets/HeartIcon";
import Comment from "@components/Comment";
import "./style.css";
import EditPenIcon from "@assets/EditPenIcon";
import Input from "@components/Input";
import Button from "@components/Button";
import FrameWrapper from "@components/FrameWrapper";
import { AuthContext } from "@providers/AuthProvider";
import type { IUser, IComment, IPost } from "@/interfaces";
import { formattedDate } from "@utils/dateFormatter";
import React from "react";
import { fetchData } from "@utils/apiUtil";
import ChevronIconExpanded from "@assets/ChevronIconExpanded";

interface PostProps {
  post: IPost;
  onLike: () => void;
}

function Post({ post, onLike }: PostProps) {
  const {
    id,
    authorId,
    title,
    content,
    image,
    likesCount,
    likedByUsers,
    creationDate,
  } = post;

  const { user } = useContext(AuthContext);

  const [author, setAuthor] = useState<IUser | null>(null);
  const [comments, setComments] = useState<IComment[] | null>(null);
  const [isCommentsExpanded, setIsCommentsExpanded] = useState(false);
  const [comment, setComment] = useState("");

  const handleExpand = () => {
    setIsCommentsExpanded((prev) => !prev);
  };

  useEffect(() => {
    if (user) {
      getComments();
    }
    getAuthor();
  }, []);

  const getComments = async () => {
    const commentsData = await fetchData(`/api/posts/${id}/comments`, "GET");
    setComments(commentsData);
  };

  const getAuthor = async () => {
    const postAuthor = await fetchData(`api/users/${authorId}`, "GET");
    setAuthor(postAuthor);
  };

  const handleDislike = async () => {
    await fetchData("api/dislike", "POST", { postId: id });
    onLike();
  };

  const handleLike = async () => {
    await fetchData("api/like", "POST", { postId: id });
    onLike();
  };

  const handleAddComment = async () => {
    if (comment) {
      await fetchData("api/comments", "POST", {
        postId: post.id,
        text: comment,
      });
    }
    getComments();
    setComment("");
  };

  const handleDeleteComment = async (commentId: number) => {
    await fetchData(`/api/comments/${commentId}`, "DELETE");
    setComments((prev) =>
      prev ? prev.filter((c) => c.id !== commentId) : prev
    );
  };

  const handleSetComment = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  return (
    <article className="post">
      <FrameWrapper>
        <div className="without-comment">
          <div className="post-header">
            <img
              src={author?.profileImage}
              alt={`Profile picture of ${authorId}`}
              className="post-avatar"
              loading="lazy"
            />
            <h2>{author?.firstName}</h2>
            <time
              dateTime={creationDate}
              className="post-timestamp"
              title={creationDate}
            >
              {formattedDate(creationDate)}
            </time>
          </div>
          {image && (
            <figure>
              <img src={image} />
            </figure>
          )}
          <div className="post-text">
            <h3>{title}</h3>
            <p> {content}</p>
          </div>
          <div className="post-info">
            <div className="likes">
              {user && likedByUsers?.some((u) => u.email === user.email) ? (
                <button className="like" onClick={handleDislike}>
                  <HeartIcon className="liked" />
                </button>
              ) : (
                <button className="like" onClick={handleLike}>
                  <HeartIcon className="disliked" />
                </button>
              )}

              <span>{likesCount} likes</span>
            </div>
            <div className="comments">
              <CommentIcon />
              {user ? (
                <span>{comments?.length} comments</span>
              ) : (
                <span>You have to login to see the comments </span>
              )}
              {user && (
                <Button
                  Icon={isCommentsExpanded ? ChevronIconExpanded : ChevronIcon}
                  type="button"
                  onButtonClick={handleExpand}
                />
              )}
            </div>
          </div>
        </div>

        {user && isCommentsExpanded && (
          <ul className="post-comments">
            {comments?.map((comment, i) => (
              <Comment
                key={comment.id}
                number={i + 1}
                comment={comment}
                onDelete={() => handleDeleteComment(comment.id)}
              />
            ))}
          </ul>
        )}
        {user && (
          <div className="add-comment">
            <Input
              id="comment"
              description="Add a comment"
              name="comment"
              placeholder="Write description here..."
              type="text"
              Icon={EditPenIcon}
              value={comment}
              onChange={handleSetComment}
            />
            <Button
              description="Add a comment"
              type="button"
              onButtonClick={handleAddComment}
            />
          </div>
        )}
      </FrameWrapper>
    </article>
  );
}

export default React.memo(Post);
