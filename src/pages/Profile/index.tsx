import "./style.css";
import { useContext } from "react";
import ProfileInfo from "@components/ProfileInfo";
import Statistics from "@components/Statistics";
import { ProfilePageContext } from "@/providers/ProfilePageProvider";

function Profile() {
  const { profilePage, changePage } = useContext(ProfilePageContext);

  return (
    <main className="profile">
      <nav>
        <a
          onClick={() => changePage("info")}
          className={profilePage === "info" ? "active" : ""}
        >
          Profile Info
        </a>
        <a
          onClick={() => changePage("statistics")}
          className={profilePage === "statistics" ? "active" : ""}
        >
          Statistic
        </a>
      </nav>
      {profilePage === "info" && <ProfileInfo />}
      {profilePage === "statistics" && <Statistics />}
    </main>
  );
}

export default Profile;
