import ErrorIcon from "@/assets/ErrorIcon";
import "./style.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
