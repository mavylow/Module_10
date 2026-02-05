import { AuthContext } from "@/AuthProvider";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ToggleThemeButton from "@/components/ToggleTheme";
import { useContext, useMemo } from "react";
import { useFormik } from "formik";
import PersonIcon from "@/assets/PersonIcon";
import MailIcon from "@/assets/MailIcon";
import EditPenIcon from "@/assets/EditPenIcon";
import "./style.css";
import Textarea from "@/components/Textarea";
import ErrorWarningIcon from "@/assets/ErrorWarningIcon";
import * as Yup from "yup";
import type { IProfileForm } from "@/TestConsts";

const IProfileSchema = Yup.object({
  image: Yup.string().nullable(),
  username: Yup.string().max(20, "Username is too long"),
  email: Yup.string().email("Enter write email"),
  description: Yup.string().max(200, "Max 200 chars").nullable(),
});

function ProfileInfo() {
  const { logOut, user, updateUser } = useContext(AuthContext);

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
    logOut();
  };

  const changeProfile = (data: IProfileForm) => {
    updateUser(data);
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="profile-info">
        <section className="edit-profile">
          <h2>Edit profile</h2>
          <div className="profile-photo">
            {user?.profileImage ? (
              <img src={user?.profileImage} loading="lazy" />
            ) : (
              <img src="/image/default-avatar.webp" loading="lazy" />
            )}

            <h3>
              {user?.firstName} {user?.secondName}
            </h3>
            <p> Change profile photo</p>
          </div>
          <div className="username">
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
            {formik.errors.username && (
              <div className="info-warning">
                <ErrorWarningIcon /> {formik.errors.username}
              </div>
            )}
          </div>
          <div className="email">
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
            {formik.errors.email && (
              <div className="info-warning">
                <ErrorWarningIcon /> {formik.errors.email}
              </div>
            )}
          </div>
          <div className="description">
            <Textarea
              id="description"
              name="description"
              description="Description"
              placeholder="Write description"
              Icon={EditPenIcon}
              value={formik.values.description || ""}
              onChange={formik.handleChange}
            />
            {formik.errors.description && (
              <div className="info-warning">
                <ErrorWarningIcon /> {formik.errors.description}
              </div>
            )}
          </div>
          <Button description="Save changes" type="submit" />
        </section>
        <div>
          <section className="preferences">
            <h2>Preferences</h2>
            <ToggleThemeButton />
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
    </>
  );
}

export default ProfileInfo;
