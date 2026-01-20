import { X } from "../../assets/X";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "./Fallback.css";

export default function Fallback() {
  return (
    <>
      <Header />
      <main>
        <X theme="night" />
        <h1>
          Oops...
          <br /> Something bad has just happened
        </h1>
      </main>
      <Footer />
    </>
  );
}
