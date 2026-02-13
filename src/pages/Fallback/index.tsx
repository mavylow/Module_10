import ErrorIcon from "@/assets/ErrorIcon";
import Footer from "@components/Footer";
import Header from "@components/Header";
import "./style.css";

export default function Fallback() {
  return (
    <>
      <Header />
      <main>
        <ErrorIcon />
        <h1>
          Oops...
          <br /> Something bad has just happened
        </h1>
      </main>
      <Footer />
    </>
  );
}
