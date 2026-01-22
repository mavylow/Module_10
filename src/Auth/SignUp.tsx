import "./AuthStyle.css";

import { Email } from "../assets/Email";
import { Eye } from "../assets/Eye";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";

export default function SignUp() {
  return (
    <>
      <form className="sing-up">
        <div className="form-header">
          <h1>Create an account</h1>
          <p>Enter your email and password to sign up for this app</p>
        </div>
        <div className="input-container">
          <Input
            id="email"
            description="Email"
            name="email"
            placeholder="Enter email"
            type="email"
            Icon={Email}
          />
        </div>
        <div className="input-container">
          <Input
            id="password"
            description="Password"
            name="password"
            placeholder="Enter password"
            type="password"
            Icon={Eye}
          />
        </div>

        <Button description="Sign Up" />
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
        <a href="/login" className="nav-link" rel="nofollow">
          Sign in
        </a>
      </span>
    </>
  );
}
