import { useState, type ChangeEvent } from "react";
import FrameWrapper from "@components/FrameWrapper";
import { useFormik } from "formik";
import "./style.css";
import Button from "@components/Button";
import Input from "@components/Input";
import EditPenIcon from "@assets/EditPenIcon";
import MailIcon from "@assets/MailIcon";
import UploadFileIcon from "@assets/UploadFileIcon";
import ErrorIcon from "@assets/CrossIcon";
import Textarea from "@components/Textarea";
import * as Yup from "yup";
import { addPostsAxios } from "@utils/apiUtil";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import InputMessage from "@components/InputMessage";
import ErrorWarningIcon from "@/assets/ErrorWarningIcon";
import DOMPurify from "dompurify";
import { useTranslation } from "react-i18next";

const postFormInitial = {
  title: "",
  content: "",
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

  content: Yup.string().max(200, "Max 200 characters"),

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
  content?: string;
  image?: Blob;
}

interface ICreatePostProps {
  onAdd: () => void;
}

function CreatePost({ onAdd }: ICreatePostProps) {
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.auth.user);

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
      title: DOMPurify.sanitize(data.title),
      content: data.content && DOMPurify.sanitize(data.content),
      image: data.image ? URL.createObjectURL(data.image) : null,
    };

    await addPostsAxios(JSON.stringify(newPost));
    postForm.resetForm();
    handleDisplayAddMenu();
    onAdd();
  };

  const addFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) {
      return;
    }
    postForm.setFieldValue("image", file);
  };

  return (
    <>
      {isModalOpen && (
        <form
          data-testid="add-post-form"
          className="add-post"
          onSubmit={postForm.handleSubmit}
        >
          <div className="post-form-header">
            <h2>Create a new post</h2>
            <Button
              type="button"
              Icon={ErrorIcon}
              onButtonClick={handleDisplayAddMenu}
            />
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
          {postForm.errors.title && (
            <InputMessage
              Icon={ErrorWarningIcon}
              status="error"
              message={postForm.errors.title}
            />
          )}
          <Textarea
            id="post-description"
            description="Description"
            name="content"
            placeholder="Write description here..."
            Icon={EditPenIcon}
            value={postForm.values.content || ""}
            onChange={postForm.handleChange}
          />
          {postForm.errors.content && (
            <InputMessage
              Icon={ErrorWarningIcon}
              status="error"
              message={postForm.errors.content}
            />
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
            onChange={addFile}
          />
          {postForm.errors.image ? (
            <InputMessage
              Icon={ErrorWarningIcon}
              status="error"
              message={postForm.errors.image}
            />
          ) : (
            <InputMessage
              Icon={ErrorWarningIcon}
              status="warning"
              message="Max allowed size is 10MB"
            />
          )}
          <Button type="submit" description="Create" />
        </form>
      )}
      <FrameWrapper>
        <div className="create-post">
          <div>
            <img src={user?.profileImage} />
            <span>{t("whatHappening")}</span>
          </div>

          <Button
            type="button"
            description={t("tellEveryone")}
            onButtonClick={handleDisplayAddMenu}
          />
        </div>
      </FrameWrapper>
      {isModalOpen && (
        <div className="overlay" onClick={handleDisplayAddMenu}></div>
      )}
    </>
  );
}

export default CreatePost;
