import { useContext, useState } from "react";
import FrameWrapper from "@components/FrameWrapper";
import { AuthContext } from "@/AuthProvider";
import { useFormik } from "formik";
import "./style.css";
import Button from "@components/Button";
import Input from "@components/Input";
import EditPenIcon from "@/assets/EditPenIcon";
import MailIcon from "@/assets/MailIcon";
import UploadFileIcon from "@/assets/UploadFileIcon";
import ErrorIcon from "@/assets/ErrorIcon";
import Textarea from "../Textarea";
import { yup } from "yup";

const postFormInitial = {
  postTitle: "",
  description: "",
};

interface IPostForm {
  postTitle: string;
  description: string;
  postImg?: Blob;
}

function CreatePost() {
  const { user } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const postForm = useFormik<IPostForm>({
    initialValues: postFormInitial,
    onSubmit: (data) => addPost(data),
  });

  const handleDisplayAddMenu = () => {
    setIsModalOpen((prev) => !prev);
  };

  const addPost = (data: IPostForm) => {};

  return (
    <>
      {isModalOpen && (
        <form className="add-post" onSubmit={postForm.handleSubmit}>
          <div className="post-form-header">
            <h2>Create a new post</h2>{" "}
            <button id="close-modal" onClick={handleDisplayAddMenu}>
              <ErrorIcon />
            </button>
          </div>

          <Input
            id="post-title"
            description="Post title"
            name="title"
            placeholder="Enter post title"
            type="text"
            Icon={MailIcon}
            value={postForm.values.postTitle}
            onChange={postForm.handleChange}
          />
          <Textarea
            id="post-description"
            description="Description"
            name="description"
            placeholder="Write description here..."
            Icon={EditPenIcon}
            value={postForm.values.description}
            onChange={postForm.handleChange}
          />
          <label htmlFor="postImg" className="postImg-label">
            <UploadFileIcon />
            <div>
              <p>Select a file or drag and drop here</p>
              <span>JPG, PNG or PDF, file size no more than 10MB</span>
            </div>
          </label>
          <input type="file" name="postImg" placeholder="" id="postImg" />
          <Button type="submit" description="Create" />
        </form>
      )}
      <FrameWrapper>
        <div className="create-post">
          <div>
            {user?.profileImage ? (
              <img src={user?.profileImage} loading="lazy" />
            ) : (
              <img src="/image/default-avatar.webp" loading="lazy" />
            )}
            <span>What’s happening?</span>
          </div>

          <Button
            type="button"
            description="Tell everyone"
            onButtonClick={handleDisplayAddMenu}
          />
        </div>
      </FrameWrapper>
      {isModalOpen && <div className="overlay"> </div>}
    </>
  );
}

export default CreatePost;
