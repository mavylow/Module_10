import "./AuthStyle.css";
import { Email } from "./assets/Email";
import { Eye } from "./assets/Eye";

export default function SignIn() {
  return (
    <>
      <form className="sing-up">
        <div className="form-header">
          <h1>Sign in into an account</h1>
          <p>Enter your email and password to sign in into this app</p>
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
      </form>
      <span>
        Forgot to create an account?{" "}
        <a href="/login" className="nav-link" rel="nofollow">
          Sign up
        </a>
      </span>
    </>
  );
}
