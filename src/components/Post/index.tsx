import { useState, type ChangeEvent } from "react";
import CommentIcon from "@assets/CommentIcon";
import ChevronIcon from "@assets/ChevronIcon";
import Comment from "@components/Comment";
import "./style.css";
import EditPenIcon from "@assets/EditPenIcon";
import Input from "@components/Input";
import Button from "@components/Button";
import FrameWrapper from "@components/FrameWrapper";
import type { IUser, IComment, IPost } from "@/interfaces";
import { formattedDate } from "@utils/dateFormatter";
import React from "react";
import { fetchData } from "@utils/apiUtil";
import ChevronIconExpanded from "@assets/ChevronIconExpanded";
import HeartLikeIcon from "@assets/HeartLikeIcon";
import HeartDislikeIcon from "@assets/HeartDislikeIcon";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import Skeleton from "@mui/material/Skeleton";

const queryClient = new QueryClient();

interface PostProps {
  post: IPost;
  onLike: () => void;
}

function Post({ post, onLike }: PostProps) {
  const { id, authorId, title, content, image, likedByUsers, creationDate } =
    post;

  const user = useSelector((state: RootState) => state.auth.user);

  const [isCommentsExpanded, setIsCommentsExpanded] = useState(false);
  const [comment, setComment] = useState("");

  const { data: author } = useQuery<IUser>({
    queryKey: ["users", authorId],
    queryFn: () => fetchData(`api/users/${authorId}`, "GET"),
    enabled: !!user,
  });

  const { data: comments, refetch: refetchComments } = useQuery<IComment[]>({
    queryKey: ["posts", id, "comments"],
    queryFn: () => fetchData(`/api/posts/${id}/comments`, "GET"),
    enabled: !!user,
  });

  const likeMutation = useMutation({
    mutationFn: () => fetchData("api/like", "POST", { postId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
      onLike();
    },
  });
  const dislikeMutation = useMutation({
    mutationFn: () => fetchData("api/dislike", "POST", { postId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
      onLike();
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: (commentId: number) =>
      fetchData(`/api/comments/${commentId}`, "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", id, "comments"] });
      refetchComments();
    },
  });

  const handleExpand = () => {
    setIsCommentsExpanded((prev) => !prev);
  };

  const handleDislike = async () => {
    dislikeMutation.mutate();
  };

  const handleLike = async () => {
    likeMutation.mutate();
  };

  const handleAddComment = async () => {
    if (comment) {
      await fetchData("api/comments", "POST", {
        postId: post.id,
        text: comment,
      });
    }
    refetchComments();
    setComment("");
  };

  const handleDeleteComment = async (commentId: number) => {
    addCommentMutation.mutate(commentId);
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
              alt={`Profile picture of ${author?.username}`}
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
                <Button
                  type="button"
                  Icon={HeartLikeIcon}
                  onButtonClick={handleDislike}
                />
              ) : (
                <Button
                  type="button"
                  Icon={HeartDislikeIcon}
                  onButtonClick={handleLike}
                />
              )}

              <span>{likedByUsers.length} likes</span>
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
            {!comments ? (
              <Skeleton variant="rectangular" />
            ) : (
              comments.map((comment, i) => (
                <Comment
                  key={comment.id}
                  number={i + 1}
                  comment={comment}
                  onDelete={() => handleDeleteComment(comment.id)}
                />
              ))
            )}
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
