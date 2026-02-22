import { AuthContext } from "@providers/AuthProvider";
import Button from "@components/Button";
import Input from "@components/Input";
import { useContext, useMemo } from "react";
import { useFormik } from "formik";
import PersonIcon from "@assets/PersonIcon";
import MailIcon from "@assets/MailIcon";
import EditPenIcon from "@assets/EditPenIcon";
import "./style.css";
import Textarea from "@components/Textarea";
import ErrorWarningIcon from "@assets/ErrorWarningIcon";
import * as Yup from "yup";
import type { IProfileForm } from "@/interfaces";
import Checkbox from "@components/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/store";
import { logOut } from "@/slices/authSlice";
import { observer } from "mobx-react-lite";
import theme from "@/store/themeStore";
import InputMessage from "@components/InputMessage";
import { Skeleton } from "@mui/material";
import DOMPurify from "dompurify";

const IProfileSchema = Yup.object({
  image: Yup.string().nullable(),
  username: Yup.string().max(20, "Username is too long"),
  email: Yup.string().email("Enter write email"),
  description: Yup.string().max(200, "Max 200 chars").nullable(),
});

const ProfileInfo = observer(() => {
  const { user, isLoading } = useSelector((state: RootState) => state.auth);
  const { updateUser } = useContext(AuthContext);

  const dispatch = useDispatch<AppDispatch>();

  const initialValues = useMemo(
    () => ({
      image: user?.profileImage || "/default-avatar.jpg",
      username: user?.username || "",
      email: user?.email || "",
      description: user?.description || "",
    }),
    [user]
  );

  const formik = useFormik<IProfileForm>({
    initialValues: initialValues,
    validationSchema: IProfileSchema,
    enableReinitialize: true,
    onSubmit: (data) => changeProfile(data),
  });

  const handleLogout = () => {
    dispatch(logOut());
  };

  const changeProfile = (data: IProfileForm) => {
    const sanitizeData = {
      image: DOMPurify.sanitize(data.image || ""),
      username: DOMPurify.sanitize(user?.username || ""),
      email: DOMPurify.sanitize(user?.email || ""),
      description: DOMPurify.sanitize(user?.description || ""),
    };
    updateUser(sanitizeData);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="profile-info">
      <section className="edit-profile">
        <h2>Edit profile</h2>
        <div className="profile-photo">
          {isLoading ? (
            <ProfilePhotoSkeleton />
          ) : (
            <>
              <img src={user?.profileImage} />
              <h3>
                {user?.firstName} {user?.secondName}
              </h3>
              <p> Change profile photo</p>
            </>
          )}
        </div>
        <div className="username input-container">
          <Input
            id="username"
            description="Username"
            name="username"
            type="text"
            placeholder="Write your username"
            Icon={PersonIcon}
            value={formik.values.username}
            onChange={formik.handleChange}
          />

          {formik.errors.username ? (
            <InputMessage
              Icon={ErrorWarningIcon}
              status="error"
              message={formik.errors.username}
            />
          ) : (
            <InputMessage
              Icon={ErrorWarningIcon}
              status="warning"
              message="Max 20 chars"
            />
          )}
        </div>
        <div className="email input-container">
          <Input
            id="email"
            description="Email"
            name="email"
            type="email"
            placeholder="Change email"
            Icon={MailIcon}
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email ? (
            <InputMessage
              Icon={ErrorWarningIcon}
              status="error"
              message={formik.errors.email}
            />
          ) : (
            <InputMessage
              Icon={ErrorWarningIcon}
              status="warning"
              message="example@emai.com"
            />
          )}
        </div>
        <div className="description input-container">
          <Textarea
            id="description"
            name="description"
            description="Description"
            placeholder="Write description"
            Icon={EditPenIcon}
            value={formik.values.description || ""}
            onChange={formik.handleChange}
          />
          {formik.errors.description ? (
            <InputMessage
              Icon={ErrorWarningIcon}
              status="error"
              message={formik.errors.description}
            />
          ) : (
            <InputMessage
              Icon={ErrorWarningIcon}
              status="warning"
              message="Max 200 chars"
            />
          )}
        </div>
        <Button description="Save changes" type="submit" />
      </section>
      <div>
        <section className="preferences">
          <h2>Preferences</h2>
          <div className="theme">
            <Checkbox
              onToggle={() => theme.changeTheme()}
              id="theme"
              description={
                theme.value.slice(0, 1).toUpperCase() +
                theme.value.slice(1) +
                " theme"
              }
            />
          </div>
        </section>
        <section className="actions">
          <h2>Actions</h2>
          <Button
            description="Logout"
            type="button"
            onButtonClick={handleLogout}
          />
        </section>
      </div>
    </form>
  );
});

export default ProfileInfo;

const ProfilePhotoSkeleton = () => {
  return (
    <>
      <Skeleton
        variant="circular"
        width={64}
        height={64}
        sx={{ gridRow: "1 / span 2" }}
      />

      <Skeleton width={"50%"} height={24} />

      <span> Change profile photo</span>
    </>
  );
};
