import { AuthContext } from "@/AuthProvider";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ToggleThemeButton from "@/components/ToggleTheme";
import { useContext, useEffect, useMemo } from "react";
import { useFormik } from "formik";
import PersonIcon from "@/assets/PersonIcon";
import MailIcon from "@/assets/MailIcon";
import EditPenIcon from "@/assets/EditPenIcon";
import "./style.css";
import Textarea from "@/components/Textarea";
import { useNavigate } from "react-router";
import ErrorWarningIcon from "@/assets/ErrorWarningIcon";

interface IProfileForm {
  image?: string;
  username: string;
  email: string;
  description: string;
}

function ProfileInfo() {
  const { logOut, user } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/home");
    }
  }, [user]);

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
    enableReinitialize: true,
    onSubmit: (date) => console.log(date),
  });

  const handleLogout = () => {
    logOut();
  };
  return (
    <>
      <form onSubmit={formik.handleSubmit} className="profile-info">
        <section className="edit-profile">
          <h2>Edit profile</h2>
          <div className="profile-photo">
            <img src={user?.profileImage || "/image/default-avatar.webp"}></img>
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
          </div>
          <div className="description">
            <Textarea
              id="description"
              name="description"
              description="Description"
              placeholder="Write description"
              Icon={EditPenIcon}
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            {formik.values.description.length >= 200 && (
              <div className="info-warning">
                <ErrorWarningIcon /> Max 200 chars
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
