import PageNotFoundIcon from "@/assets/PageNotFoundIcon";
import Footer from "@components/Footer";
import Header from "@components/Header";
import "./style.css";

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <main>
        <PageNotFoundIcon />
        <h1>Page not found</h1>
      </main>

      <Footer />
    </>
  );
}
