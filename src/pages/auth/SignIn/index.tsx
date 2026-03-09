import { useEffect, useState } from "react";
import MailIcon from "@assets/MailIcon";
import EyeOpenIcon from "@assets/EyeOpenIcon";
import Button from "@components/Button";
import Input from "@components/Input";
import "@pages/auth/style.css";
import { useFormik } from "formik";
import type { IForm } from "@/interfaces";
import * as Yup from "yup";
import ErrorWarningIcon from "@assets/ErrorWarningIcon";
import ThumbUpIcon from "@assets/ThumbUpIcon";
import { NavLink, useNavigate } from "react-router";
import CheckIcon from "@assets/CheckIcon";
import CrossIcon from "@assets/CrossIcon";
import EyeCrossedIcon from "@assets/EyeCrossedIcon";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { signIn } from "@/slices/authSlice";
import InputMessage from "@/components/InputMessage";
import { useTranslation } from "react-i18next";

export default function SignIn() {
  const { t } = useTranslation();

  const FormSchema = Yup.object({
    email: Yup.string().required().email("Write correct email"),
    password: Yup.string()
      .min(8, t("shortPassword"))
      .max(14, t("longPassword"))
      .matches(/[0-9]/, t("passwordContainNumber")),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useSelector<RootState>((state) => state.auth.isAuth);
  const form = useFormik<IForm>({
    initialValues: { email: "", password: "" },
    validationSchema: FormSchema,
    onSubmit: (data) => dispatch(signIn(data)),
  });

  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  const handleShowPassword = () => {
    setIsPasswordOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  return (
    <main>
      <form className="sing-up" onSubmit={form.handleSubmit}>
        <div className="form-header">
          <h1>{t("signIntoAccount")}</h1>
          <p>
            {t("enterFields", { sign: t("toSignIn"), appPreposition: "о" })}
          </p>
        </div>
        <div className="inputs">
          <div className="input-container">
            <Input
              id="email"
              description={t("email")}
              name="email"
              placeholder={t("emailPlaceholder")}
              type="email"
              Icon={MailIcon}
              value={form.values.email}
              onChange={form.handleChange}
            />
            {form.values.email && (
              <>
                {form.errors.email ? (
                  <>
                    <InputMessage
                      message={t("emailNotValid")}
                      Icon={ErrorWarningIcon}
                      status="error"
                    />

                    <div className="error email-warning">
                      <CrossIcon />
                    </div>
                  </>
                ) : (
                  <div className="correct email-warning">
                    <CheckIcon />
                  </div>
                )}
              </>
            )}
          </div>
          <div className="input-container">
            <div
              data-testid="password-icon"
              className="password-icon"
              onClick={handleShowPassword}
            >
              {isPasswordOpen ? <EyeCrossedIcon /> : <EyeOpenIcon />}
            </div>
            <Input
              id="password"
              description={t("password")}
              name="password"
              placeholder={t("passwordPlaceholder")}
              type={isPasswordOpen ? "text" : "password"}
              Icon={EyeOpenIcon}
              value={form.values.password}
              onChange={form.handleChange}
            />
            {form.values.password && (
              <>
                {form.errors.password ? (
                  <InputMessage
                    message={form.errors.password}
                    Icon={ErrorWarningIcon}
                    status="error"
                  />
                ) : (
                  <InputMessage
                    message={t("strongPassword")}
                    Icon={ThumbUpIcon}
                    status="success"
                  />
                )}
              </>
            )}
          </div>

          <Button description={t("signIn")} type="submit" />
        </div>
      </form>
      <span>
        {t("forgotToCreate")}{" "}
        <NavLink className={"nav-link"} to={"/signup"}>
          {t("signUp")}
        </NavLink>
      </span>
    </main>
  );
}
