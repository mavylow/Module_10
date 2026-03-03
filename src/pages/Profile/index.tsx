import "./style.css";
import { useContext } from "react";
import ProfileInfo from "@components/ProfileInfo";
import Statistics from "@components/Statistics";
import { ProfilePageContext } from "@/providers/ProfilePageProvider";
import { useTranslation } from "react-i18next";

function Profile() {
  const { t } = useTranslation();
  const { profilePage, changePage } = useContext(ProfilePageContext);

  return (
    <main className="profile">
      <nav>
        <a
          onClick={() => changePage("info")}
          className={profilePage === "info" ? "active" : ""}
        >
          {t("profileInfo")}
        </a>
        <a
          onClick={() => changePage("statistics")}
          className={profilePage === "statistics" ? "active" : ""}
        >
          {t("statistics")}
        </a>
      </nav>
      {profilePage === "info" && <ProfileInfo />}
      {profilePage === "statistics" && <Statistics />}
    </main>
  );
}

export default Profile;
