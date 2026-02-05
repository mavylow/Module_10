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
import * as Yup from "yup";
import { fetchData } from "@/apiUtil";

const postFormInitial = {
  title: "",
  description: "",
};
const MAX_FILE_SIZE = 1_048_576;
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
];

const FormSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .max(20, "Max 20 characters"),

  description: Yup.string()
    .required("Description is required")
    .max(200, "Max 200 characters"),

  image: Yup.mixed<File>()
    .nullable()
    .test(
      "fileSize",
      "Max allowed size is 10MB",
      (value) => !value || value.size <= MAX_FILE_SIZE
    )
    .test(
      "fileFormat",
      "Unsupported file format",
      (value) => !value || SUPPORTED_FORMATS.includes(value.type)
    ),
});

interface IPostForm {
  title: string;
  description?: string;
  image?: Blob;
}

interface ICreatePostProps {
  onAdd: () => void;
}

function CreatePost({ onAdd }: ICreatePostProps) {
  const { user } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const postForm = useFormik<IPostForm>({
    initialValues: postFormInitial,
    validationSchema: FormSchema,
    onSubmit: (data) => addPost(data),
  });

  const handleDisplayAddMenu = () => {
    setIsModalOpen((prev) => !prev);
  };

  const addPost = async (data: IPostForm) => {
    const newPost = {
      ...data,
      image: data.image ? URL.createObjectURL(data.image) : null,
    };
    await fetchData("/api/posts", "POST", newPost);
    postForm.resetForm();
    handleDisplayAddMenu();
    onAdd();
  };

  return (
    <>
      {isModalOpen && (
        <form className="add-post" onSubmit={postForm.handleSubmit}>
          <div className="post-form-header">
            <h2>Create a new post</h2>{" "}
            <button
              id="close-modal"
              type="button"
              onClick={handleDisplayAddMenu}
            >
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
            value={postForm.values.title}
            onChange={postForm.handleChange}
          />
          {postForm.errors.title && <span>{postForm.errors.title}</span>}
          <Textarea
            id="post-description"
            description="Description"
            name="description"
            placeholder="Write description here..."
            Icon={EditPenIcon}
            value={postForm.values.description || ""}
            onChange={postForm.handleChange}
          />
          {postForm.errors.description && (
            <span>{postForm.errors.description}</span>
          )}
          <label htmlFor="image" className="postImg-label">
            <UploadFileIcon />
            <div>
              <p>Select a file or drag and drop here</p>
              <span>JPG, PNG or PDF, file size no more than 10MB</span>
            </div>
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            hidden
            onChange={(event) => {
              const file = event.currentTarget.files?.[0];
              if (!file) {
                return;
              }
              console.log(file);
              postForm.setFieldValue("image", file);
            }}
          />
          {postForm.errors.image && <span>{postForm.errors.image}</span>}
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
