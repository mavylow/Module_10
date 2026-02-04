import ProfileInfo from "@/pages/ProfileInfo";
import Footer from "@components/Footer";
import Header from "@components/Header";
import { useLocation, useNavigate } from "react-router";
import "./style.css";

function Profile() {
  const location = useLocation();
  let navigate = useNavigate();

  return (
    <>
      <Header />
      <main className="profile">
        <nav>
          <a
            onClick={() => navigate("/profile-info")}
            className={location.pathname === "/profile-info" ? "active" : ""}
          >
            Profile Info
          </a>
          <a
            onClick={() => navigate("/statistics")}
            className={location.pathname === "/statistics" ? "active" : ""}
          >
            Statistic
          </a>
        </nav>
        {location.pathname === "/profile-info" && <ProfileInfo />}
        {location.pathname === "/statistics" && <ProfileInfo />}
      </main>
      <Footer />
    </>
  );
}

export default Profile;
