import { useContext, useState, type ChangeEvent, type FormEvent } from "react";
import { Email } from "@assets/Email";
import { Eye } from "@assets/Eye";
import Button from "@components/Button";
import Footer from "@components/Footer";
import Header from "@components/Header";
import Input from "@components/Input";
import "../style.css";
import { AuthContext } from "../../../AuthProvider";

const signUpForm = {
  email: "",
  password: "",
};

export default function SignUp() {
  const [form, setForm] = useState(signUpForm);

  const { signUp } = useContext(AuthContext);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp(form);
  };

  return (
    <>
      <Header />
      <main>
        <form className="sing-up" onSubmit={handleSubmit}>
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
              value={form.email}
              onInput={handleInputChange}
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
              value={form.password}
              onInput={handleInputChange}
            />
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
          <a href="/login" className="nav-link" rel="nofollow">
            Sign in
          </a>
        </span>
      </main>
      <Footer />
    </>
  );
}
