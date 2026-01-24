import { useContext, useState } from "react";
import { Email } from "../../assets/Email";
import { Eye } from "../../assets/Eye";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Input from "../../components/Input/Input";
import "./AuthStyle.css";
import { AuthContext } from "../../AuthProvider";

export default function SignIn() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { signIn, logOut } = useContext(AuthContext);

  const handleSingIn = () => {
    signIn(email);
  };

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

          <Button description="SingIn" onButtonClick={handleSingIn} />
          <Button description="LogOut" onButtonClick={() => logOut()} />
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
