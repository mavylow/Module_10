import { useContext, useEffect, useState } from "react";
import MailIcon from "@assets/MailIcon";
import EyeOpenIcon from "@assets/EyeOpenIcon";
import Button from "@components/Button";
import Input from "@components/Input";
import "@pages/auth/style.css";
import { AuthContext } from "@providers/AuthProvider";
import { useFormik } from "formik";
import type { IForm } from "@/interfaces";
import * as Yup from "yup";
import ErrorWarningIcon from "@assets/ErrorWarningIcon";
import ThumbUpIcon from "@assets/ThumbUpIcon";
import { useNavigate } from "react-router";
import CheckIcon from "@/assets/CheckIcon";
import CrossIcon from "@/assets/CrossIcon";
import EyeCrossedIcon from "@/assets/EyeCrossedIcon";

const FormSchema = Yup.object({
  email: Yup.string().required().email(),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(14, "Password cannot exceed 14 characters")
    .matches(/[0-9]/, "Password must contain at least one number"),
});

export default function SignIn() {
  const form = useFormik<IForm>({
    initialValues: { email: "", password: "" },
    validationSchema: FormSchema,
    onSubmit: (data) => signIn(data),
  });
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  const handleShowPassword = () => {
    setIsPasswordOpen((prev) => !prev);
  };

  const { signIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  useEffect(() => {});

  return (
    <main>
      <form className="sing-up" onSubmit={form.handleSubmit}>
        <div className="form-header">
          <h1>Sign in into an account</h1>
          <p>Enter your email and password to sign in into this app</p>
        </div>
        <div className="input-container">
          <Input
            id="email"
            description="Email"
            name="email"
            placeholder="Enter email"
            type="email"
            Icon={MailIcon}
            value={form.values.email}
            onChange={form.handleChange}
          />
          {form.values.email && (
            <>
              {form.errors.email ? (
                <>
                  <div className="input-message">
                    <ErrorWarningIcon />
                    <p className="error">Email is not valid</p>
                  </div>
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
          <div className="password-icon" onClick={handleShowPassword}>
            {isPasswordOpen ? <EyeCrossedIcon /> : <EyeOpenIcon />}
          </div>
          <Input
            id="password"
            description="Password"
            name="password"
            placeholder="Enter password"
            type={isPasswordOpen ? "text" : "password"}
            Icon={EyeOpenIcon}
            value={form.values.password}
            onChange={form.handleChange}
          />
          {form.values.password && (
            <>
              {form.errors.password ? (
                <div className="input-message">
                  <ErrorWarningIcon />
                  <p className="error">{form.errors.password}</p>
                </div>
              ) : (
                <div className="input-message">
                  <ThumbUpIcon />
                  <p className="correct">Your password is strong</p>
                </div>
              )}
            </>
          )}
        </div>

        <Button description="Sing In" type="submit" />
      </form>
      <span>
        Forgot to create an account?{" "}
        <a
          onClick={() => handleNavigate("/signup")}
          className="nav-link"
          rel="nofollow"
        >
          Sign up
        </a>
      </span>
    </main>
  );
}
