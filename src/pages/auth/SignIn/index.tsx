import { useContext, useEffect } from "react";
import MailIcon from "@/assets/MailIcon";
import EyeOpenIcon from "@/assets/EyeOpenIcon";
import Button from "@components/Button";
import Footer from "@components/Footer";
import Header from "@components/Header";
import Input from "@components/Input";
import "../style.css";
import { AuthContext } from "@/AuthProvider";
import { useForm } from "react-hook-form";
import type { IForm } from "@/TestConsts";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorWarningIcon from "@/assets/ErrorWarningIcon";
import ThumbUpIcon from "@/assets/ThumbUpIcon";
import { useNavigate } from "react-router";

const FromSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(14, "Password cannot exceed 14 characters")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, submitCount },
  } = useForm<IForm>({
    defaultValues: { email: "helena.hills@social.com" },
    resolver: zodResolver(FromSchema),
  });

  const { signIn } = useContext(AuthContext);

  let navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const onSubmit = handleSubmit(async (data) => {
    signIn(data);
  });
  useEffect(() => {});

  return (
    <>
      <Header />
      <main>
        <form className="sing-up" onSubmit={onSubmit}>
          <div className="form-header">
            <h1>Sign in into an account</h1>
            <p>Enter your email and password to sign in into this app</p>
          </div>
          <div className="input-container">
            <Input
              id="email"
              description="Email"
              placeholder="Enter email"
              type="email"
              Icon={MailIcon}
              register={register}
            />
            {errors.email && (
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
              placeholder="Enter password"
              type="password"
              Icon={EyeOpenIcon}
              register={register}
            />
            {errors.password ? (
              <div className="input-message">
                <ErrorWarningIcon />
                <p className="error">{errors.password.message}</p>
              </div>
            ) : (
              submitCount > 0 && (
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
