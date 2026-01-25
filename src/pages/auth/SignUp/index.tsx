import { useContext, useState } from "react";
import { Email } from "../../../assets/Email";
import { Eye } from "../../../assets/Eye";
import Button from "../../../components/Button";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Input from "../../../components/Input";

import "../style.css";
import { AuthContext } from "../../../AuthProvider";

export default function SignUp() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { signUp } = useContext(AuthContext);

  const handleSingUp = () => {
    signUp(email);
  };
  return (
    <>
      <Header />
      <main>
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
              value={email}
              onInput={(email) => {
                setEmail(email);
              }}
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
              value={password}
              onInput={(password) => {
                setPassword(password);
              }}
            />
          </div>

          <Button description="Sign Up" onButtonClick={handleSingUp} />
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
      </main>
      <Footer />
    </>
  );
}
