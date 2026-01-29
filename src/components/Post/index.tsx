import { useContext, useEffect, useState, type ChangeEvent } from "react";
import CommentIcon from "@/assets/CommentIcon";
import ChevronIcon from "@/assets/ChevronIcon";
import HeartIcon from "@/assets/HeartIcon";
import Comment from "@components/Comment";
import "./style.css";
import EditPenIcon from "@/assets/EditPenIcon";
import Input from "@components/Input";
import Button from "@components/Button";
import FrameWrapper from "@components/FrameWrapper";
import { AuthContext } from "@/AuthProvider";
import type { IUser, IComment, IPost } from "@/TestConsts";
import { formattedDate } from "@utils/dateFormatter";
import React from "react";
import { fetchData } from "@/apiUtil";

interface PostProps {
  post: IPost;
  // onAddComment: (postId: string, comment: IComment) => void;
}

function Post({ post }: PostProps) {
  const { id, authorId, title, content, image, likesCount, creationDate } =
    post;

  const { user } = useContext(AuthContext);

  const [author, setAuthor] = useState<IUser | null>(null);
  const [comments, setComments] = useState<IComment[] | null>(null);
  const [isCommentsExpanded, setIsCommentsExpanded] = useState(false);
  const [comment, setComment] = useState("");

  const handleExpand = () => {
    setIsCommentsExpanded((prev) => !prev);
  };

  useEffect(() => {
    fetch(`/api/users/${authorId}`)
      .then((res) => res.json())
      .then((author) => {
        console.log(author);
        setAuthor(author);
      });
  }, [authorId]);

  useEffect(() => {
    if (user) {
      getComments();
    }
  }, []);

  const getComments = async () => {
    const commentsData = await fetchData(`/api/posts/${id}/comments`, "GET");
    setComments(commentsData);
  };

  // const handleAddComment = () => {
  //   if (comment) {
  //     onAddComment(postId, {
  //       commentID: comments.length + 1,
  //       description: comment,
  //       user,
  //     });
  //   }

  //   setComment("");
  // };

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
              <img src={post.image} />
            </figure>
          )}
          <div className="post-text">
            <h3>{title}</h3>
            <p> {content}</p>
          </div>
          <div className="post-info">
            <div className="likes">
              <HeartIcon /> <span>{likesCount} likes</span>
            </div>
            <div className="comments">
              <CommentIcon />
              {user ? (
                <span>{comments?.length} comments</span>
              ) : (
                <span>You have to login to see the comments </span>
              )}
              {user && (
                <button className="expand-button" onClick={handleExpand}>
                  <ChevronIcon
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
        </div>

        {user && isCommentsExpanded && (
          <ul className="post-comments">
            {comments?.map((comment, i) => (
              <Comment key={comment.id} number={i + 1} comment={comment} />
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
              onInput={handleSetComment}
            />
            <Button
              description="Add a comment"
              type="button"
              onButtonClick={() => {}}
            />
          </div>
        )}
      </FrameWrapper>
    </article>
  );
}

export default React.memo(Post);
