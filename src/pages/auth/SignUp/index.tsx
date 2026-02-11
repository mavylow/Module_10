import { useContext, useState } from "react";
import MailIcon from "@assets/MailIcon";
import EyeOpenIcon from "@assets/EyeOpenIcon";
import EyeCrossedIcon from "@/assets/EyeCrossedIcon";
import Button from "@components/Button";
import Input from "@components/Input";
import "../style.css";
import { AuthContext } from "@providers/AuthProvider";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorWarningIcon from "@assets/ErrorWarningIcon";
import ThumbUpIcon from "@assets/ThumbUpIcon";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import CrossIcon from "@/assets/CrossIcon";
import CheckIcon from "@/assets/CheckIcon";

const FormSchema = z.object({
  email: z.string().email("Email is not valid"),
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

  const { signUp } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  const showEmailValidation = touchedFields.email || submitCount > 0;

  const showPasswordValidation = touchedFields.password || submitCount > 0;

  const onSubmit = handleSubmit((data) => {
    signUp(data);
  });

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
                  <ErrorWarningIcon />
                  <p className="error">{errors.email.message}</p>
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
              <div className="input-message">
                <ErrorWarningIcon />
                <p className="error">{errors.password.message}</p>
              </div>
            ) : (
              <div className="input-message">
                <ThumbUpIcon />
                <p className="correct">Your password is strong</p>
              </div>
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
        <a
          onClick={() => navigate("/signin")}
          className="nav-link"
          rel="nofollow"
        >
          Sign in
        </a>
      </span>
    </main>
  );
}

export default SignUp;
