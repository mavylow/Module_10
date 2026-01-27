import { useContext, useState, type ChangeEvent, type FormEvent } from "react";
import { Email } from "@assets/Email";
import { Eye } from "@assets/Eye";
import Button from "@components/Button";
import Footer from "@components/Footer";
import Header from "@components/Header";
import Input from "@components/Input";
import "../style.css";
import { AuthContext } from "../../../AuthProvider";
import Modal from "@components/Modal";

const formInitial = {
  email: "",
  password: "",
};

const modalInitial = {
  isOpen: false,
  message: "",
};

type IForm = {
  email: string;
  password: string;
};

type IModal = {
  isOpen: boolean;
  message: string;
};

export default function SignUp() {
  const [form, setForm] = useState(formInitial);
  const [modal, setModal] = useState<IModal>(modalInitial);
  const { signUp } = useContext(AuthContext);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModal(modalInitial);
    if (validateForm(form)) {
      signUp(form);
    }
  };

  const validateForm = ({ email, password }: IForm) => {
    if (password.length < 8) {
      showModal({
        isOpen: true,
        message: "Password should be more than 8 characters long",
      });

      return false;
    }
    return true;
  };

  function showModal(modal: IModal) {
    setModal(modal);
    setTimeout(() => setModal(modalInitial), 2000);
  }

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
      <Modal isOpen={modal.isOpen}>{modal.message}</Modal>
      <Footer />
    </>
  );
}
