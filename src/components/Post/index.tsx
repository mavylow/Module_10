import { useState, type ChangeEvent } from "react";
import DOMPurify from "dompurify";
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
import {
  addComment,
  deleteComment,
  dislikePost,
  likePost,
  loadPostComments,
  loadUser,
} from "@utils/apiUtil";
import ChevronIconExpanded from "@assets/ChevronIconExpanded";
import HeartLikeIcon from "@assets/HeartLikeIcon";
import HeartDislikeIcon from "@assets/HeartDislikeIcon";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Box, Skeleton } from "@mui/material";
import { useTranslation } from "react-i18next";

interface PostProps {
  post: IPost;
  onLike: () => void;
}

function Post({ post, onLike }: PostProps) {
  const { t } = useTranslation();

  const { id, authorId, title, content, image, likedByUsers, creationDate } =
    post;
  const date = formattedDate(creationDate);
  const user = useSelector((state: RootState) => state.auth.user);
  const queryClient = useQueryClient();
  const [isCommentsExpanded, setIsCommentsExpanded] = useState(false);
  const [comment, setComment] = useState("");

  const { isLoading: isAuthorLoading, data: author } = useQuery<IUser>({
    queryKey: ["users", authorId],
    queryFn: () => loadUser(authorId),
  });

  const { data: comments, refetch: refetchComments } = useQuery<IComment[]>({
    queryKey: ["posts", id, "comments"],
    queryFn: () => loadPostComments(id),
    enabled: !!user,
  });

  const likeMutation = useMutation({
    mutationFn: () => likePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
      onLike();
    },
  });
  const dislikeMutation = useMutation({
    mutationFn: () => dislikePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
      onLike();
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: number) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", id, "comments"] });
      refetchComments();
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: (commentData: string) => addComment(commentData),
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
      addCommentMutation.mutate(
        JSON.stringify({
          postId: post.id,
          text: DOMPurify.sanitize(comment),
        })
      );
    }
    refetchComments();
    setComment("");
  };

  const handleDeleteComment = async (commentId: number) => {
    deleteCommentMutation.mutate(commentId);
  };

  const handleSetComment = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  return (
    <article className="post">
      <FrameWrapper>
        <div className="without-comment">
          <div className="post-header">
            {isAuthorLoading ? (
              <PostHeaderSkeleton />
            ) : (
              <>
                <img
                  src={author?.profileImage}
                  alt={`Profile picture of ${author?.username}`}
                  className="post-avatar"
                  loading="lazy"
                />
                <h2>{author?.firstName}</h2>
              </>
            )}
            <time
              dateTime={creationDate}
              className="post-timestamp"
              title={creationDate}
            >
              {t(date.key, { count: date.count, date: date.date })}
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

              <span>{t("like", { count: likedByUsers.length })}</span>
            </div>
            <div className="comments">
              <CommentIcon />
              {user ? (
                <>
                  {comments ? (
                    <span>{t("comment", { count: comments.length })}</span>
                  ) : (
                    <Skeleton variant="text" width={10} />
                  )}
                </>
              ) : (
                <span>{t("hiddenComments")} </span>
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
              <CommentsSkeleton />
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
              description={t("addAComment")}
              name="comment"
              placeholder={t("addCommentPlaceholder")}
              type="text"
              Icon={EditPenIcon}
              value={comment}
              onChange={handleSetComment}
            />
            <Button
              description={t("addAComment")}
              type="button"
              onButtonClick={handleAddComment}
            />
          </div>
        )}
      </FrameWrapper>
    </article>
  );
}

const PostHeaderSkeleton = () => (
  <>
    <Skeleton
      variant="circular"
      width={48}
      height={48}
      animation="wave"
      className="post-avatar"
    />
    <Box marginLeft={2}>
      <Skeleton variant="text" width="60%" height={24} animation="wave" />
    </Box>
  </>
);

const CommentsSkeleton = () => (
  <Box sx={{ p: 2 }}>
    {[1, 2, 3].map((i) => (
      <Box key={i} sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Skeleton variant="circular" width={32} height={32} animation="wave" />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="40%" height={20} animation="wave" />
          <Skeleton variant="text" width="80%" height={16} animation="wave" />
        </Box>
      </Box>
    ))}
  </Box>
);

export default React.memo(Post);
