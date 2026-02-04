import { useContext, useEffect } from "react";
import MailIcon from "@/assets/MailIcon";
import EyeOpenIcon from "@/assets/EyeOpenIcon";
import Button from "@components/Button";
import Footer from "@components/Footer";
import Header from "@components/Header";
import Input from "@components/Input";
import "../style.css";
import { AuthContext } from "@/AuthProvider";
import { useFormik } from "formik";
import type { IForm } from "@/TestConsts";
import * as Yup from "yup";
import ErrorWarningIcon from "@/assets/ErrorWarningIcon";
import ThumbUpIcon from "@/assets/ThumbUpIcon";
import { useNavigate } from "react-router";

const FormSchema = Yup.object({
  email: Yup.string().required().email(),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(14, "Password cannot exceed 14 characters")
    .matches(/[0-9]/, "Password must contain at least one number"),
});

export default function SignIn() {
  const form = useFormik<IForm>({
    initialValues: { email: "helena.hills@social.com", password: "" },
    validationSchema: FormSchema,
    onSubmit: (data) => signIn(data),
  });

  const { signIn } = useContext(AuthContext);

  let navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  useEffect(() => {});

  return (
    <>
      <Header />
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
            {form.errors.email && (
              <div className="input-message">
                <ErrorWarningIcon />
                <p className="error">Email is not valid</p>
              </div>
            )}
          </div>
          <div className="input-container">
            <Input
              id="password"
              description="Password"
              name="password"
              placeholder="Enter password"
              type="password"
              Icon={EyeOpenIcon}
              value={form.values.password}
              onChange={form.handleChange}
            />
            {form.errors.password ? (
              <div className="input-message">
                <ErrorWarningIcon />
                <p className="error">{form.errors.password}</p>
              </div>
            ) : (
              form.submitCount > 0 && (
                <div className="input-message">
                  <ThumbUpIcon />
                  <p className="correct">Your password is strong</p>
                </div>
              )
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
      <Footer />
    </>
  );
}
