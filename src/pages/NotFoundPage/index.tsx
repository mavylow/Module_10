import { NotFound } from "@assets/NotFound";
import Footer from "@components/Footer";
import Header from "@components/Header";
import "./style.css";

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <main>
        <NotFound />
        <h1>Page not found</h1>
      </main>

      <Footer />
    </>
  );
}
