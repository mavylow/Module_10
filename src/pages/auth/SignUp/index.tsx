import { useEffect, useState } from "react";
import MailIcon from "@assets/MailIcon";
import EyeOpenIcon from "@assets/EyeOpenIcon";
import EyeCrossedIcon from "@/assets/EyeCrossedIcon";
import Button from "@components/Button";
import Input from "@components/Input";
import "../style.css";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorWarningIcon from "@assets/ErrorWarningIcon";
import ThumbUpIcon from "@assets/ThumbUpIcon";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import CrossIcon from "@/assets/CrossIcon";
import CheckIcon from "@/assets/CheckIcon";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { signUp } from "@/slices/authSlice";
import InputMessage from "@/components/InputMessage";

const FormSchema = z.object({
  email: z.email("Email is not valid"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(14, "Password cannot exceed 14 characters")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

type FormData = z.infer<typeof FormSchema>;

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, submitCount },
  } = useForm<FormData>({
    defaultValues: {
      email: "helena.hills@social.com",
      password: "",
    },
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useSelector<RootState>((state) => state.auth.isAuth);
  const navigate = useNavigate();
  const showEmailValidation = touchedFields.email || submitCount > 0;

  const showPasswordValidation = touchedFields.password || submitCount > 0;

  const onSubmit = handleSubmit((data) => {
    dispatch(signUp(data));
  });

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  return (
    <main>
      <form className="sing-up" onSubmit={onSubmit}>
        <div className="form-header">
          <h1>Create an account</h1>
          <p>Enter your email and password to sign up for this app</p>
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

          {showEmailValidation &&
            (errors.email ? (
              <>
                <div className="input-message">
                  <InputMessage
                    message={errors.email.message!}
                    Icon={ErrorWarningIcon}
                    status="error"
                  />
                </div>
                <div className="error email-warning">
                  <CrossIcon />
                </div>
              </>
            ) : (
              <div className="correct email-warning">
                <CheckIcon />
              </div>
            ))}
        </div>

        <div className="input-container">
          <div
            data-testid="password-icon"
            className="password-icon"
            onClick={() => setIsPasswordOpen((p) => !p)}
          >
            {isPasswordOpen ? <EyeCrossedIcon /> : <EyeOpenIcon />}
          </div>

          <Input
            id="password"
            description="Password"
            placeholder="Enter password"
            type={isPasswordOpen ? "text" : "password"}
            Icon={EyeOpenIcon}
            register={register}
          />

          {showPasswordValidation &&
            (errors.password ? (
              <InputMessage
                message={errors.password.message!}
                Icon={ErrorWarningIcon}
                status="error"
              />
            ) : (
              <InputMessage
                message="Your password is strong"
                Icon={ThumbUpIcon}
                status="success"
              />
            ))}
        </div>

        <Button description="Sign Up" type="submit" />

        <p className="legal-disclaimer">
          By clicking continue, you agree to our{" "}
          <a href="/terms" className="legal-link" rel="nofollow">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="legal-link" rel="nofollow">
            Privacy Policy
          </a>
        </p>
      </form>

      <span>
        Already have an account?{" "}
        <NavLink to={"/signin"} className="nav-link">
          Sign in
        </NavLink>
      </span>
    </main>
  );
}

export default SignUp;
