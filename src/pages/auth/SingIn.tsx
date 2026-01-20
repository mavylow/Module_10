import { Email } from "../../assets/Email";
import { Eye } from "../../assets/Eye";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Input from "../../components/Input/Input";
import "./AuthStyle.css";

export default function SignIn() {
  return (
    <>
      <Header />
      <main>
        <form className="sing-up">
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

          <Button description="SingIn" />
        </form>
        <span>
          Forgot to create an account?{" "}
          <a href="/login" className="nav-link" rel="nofollow">
            Sign up
          </a>
        </span>
      </main>
      <Footer />
    </>
  );
}
