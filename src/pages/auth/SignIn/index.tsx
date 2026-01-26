import { useContext, useState, type ChangeEvent, type FormEvent } from "react";
import { Email } from "@assets/Email";
import { Eye } from "@assets/Eye";
import Button from "@components/Button";
import Footer from "@components/Footer";
import Header from "@components/Header";
import Input from "@components/Input";
import "../style.css";
import { AuthContext } from "@/AuthProvider";

const signInForm = {
  email: "",
  password: "",
};

export default function SignIn() {
  const [form, setForm] = useState(signInForm);
  const { signIn } = useContext(AuthContext);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn(form);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Header />
      <main>
        <form className="sing-up" onSubmit={handleSubmit}>
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

          <Button description="SingIn" type="submit" />
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
