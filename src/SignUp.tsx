import "./AuthStyle.css";
import { Email } from "./assets/Email";
import { Eye } from "./assets/Eye";

export default function SignUp() {
  return (
    <>
      <form className="sing-up">
        <div className="form-header">
          <h1>Create an account</h1>
          <p>Enter your email and password to sign up for this app</p>
        </div>
        <div className="input-container">
          <label htmlFor="email">
            {" "}
            <Email theme="night" />
            Email
          </label>
          <input
            id="email"
            name="email"
            placeholder="Enter email"
            type="email"
          />
        </div>
        <div className="input-container">
          {" "}
          <label htmlFor="password">
            {" "}
            <Eye theme="night" />
            Password
          </label>
          <input
            id="password"
            name="password"
            placeholder="Enter password"
            type="password"
          />
        </div>

        <button>Sign Up</button>
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
