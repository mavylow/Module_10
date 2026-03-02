import { NavLink, Outlet } from "react-router";
import "./style.css";

function Profile() {
  return (
    <main className="profile">
      <nav>
        <NavLink to={"/profile/info"}> Profile Info</NavLink>
        <NavLink to={"/profile/statistics"}> Statistic</NavLink>
      </nav>
      <Outlet />
    </main>
  );
}

export default Profile;
