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
import { useTranslation } from "react-i18next";

const ProfileInfo = observer(() => {
  const { t } = useTranslation();

  const IProfileSchema = Yup.object({
    image: Yup.string().nullable(),
    username: Yup.string().max(20, t("usernameToLong")),
    email: Yup.string().email(t("emailNotValid")),
    description: Yup.string().max(200, t("max200chars")).nullable(),
  });

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
      username: DOMPurify.sanitize(data?.username || ""),
      email: DOMPurify.sanitize(data?.email || ""),
      description: DOMPurify.sanitize(data?.description || ""),
    };
    updateUser(sanitizeData);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="profile-info">
      <section className="edit-profile">
        <h2>{t("editProfile")}</h2>
        <div className="profile-photo">
          {isLoading ? (
            <ProfilePhotoSkeleton />
          ) : (
            <>
              <img src={user?.profileImage} />
              <h3>
                {user?.firstName} {user?.secondName}
              </h3>
              <p> {t("changeProfilePhoto")}</p>
            </>
          )}
        </div>
        <div className="username input-container">
          <Input
            id="username"
            description={t("username")}
            name="username"
            type="text"
            placeholder={t("usernamePlaceholder")}
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
              message={t("max20chars")}
            />
          )}
        </div>
        <div className="email input-container">
          <Input
            id="email"
            description={t("email")}
            name="email"
            type="email"
            placeholder={t("changeEmail")}
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
            description={t("description")}
            placeholder={t("descriptionPlaceholder")}
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
              message={t("max200chars")}
            />
          )}
        </div>
        <Button description={t("saveChanges")} type="submit" />
      </section>
      <div>
        <section className="preferences">
          <h2>{t("preferences")}</h2>
          <div className="theme">
            <Checkbox
              onToggle={() => theme.changeTheme()}
              id="theme"
              description={t(`theme.${theme.value}`)}
            />
          </div>
        </section>
        <section className="actions">
          <h2>{t("actions")}</h2>
          <Button
            description={t("logout")}
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
