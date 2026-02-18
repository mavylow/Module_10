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

const IProfileSchema = Yup.object({
  image: Yup.string().nullable(),
  username: Yup.string().max(20, "Username is too long"),
  email: Yup.string().email("Enter write email"),
  description: Yup.string().max(200, "Max 200 chars").nullable(),
});

const ProfileInfo = observer(() => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { updateUser } = useContext(AuthContext);

  const dispatch = useDispatch<AppDispatch>();
  //const { changeTheme, theme } = useContext(ThemeContext);

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
    updateUser(data);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="profile-info">
      <section className="edit-profile">
        <h2>Edit profile</h2>
        <div className="profile-photo">
          <img src={user?.profileImage} />
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
