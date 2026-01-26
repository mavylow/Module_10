import type { ICommunity, IUser } from "@/TestConsts";
import "./style.css";

export function SidebarElement({ element }: { element: IUser | ICommunity }) {
  if ("followersCount" in element) {
    return (
      <div className="aside-element">
        <img src={element.avatarPhoto}></img>
        <h3>{element.name}</h3>
        <span>{element.followersCount}</span>
      </div>
    );
  }
  if ("username" in element) {
    return (
      <div className="aside-element">
        <img src={element.profilePhoto}></img>
        <h3>{element.username}</h3>
        <span>@{element.username.toLocaleLowerCase()}</span>
      </div>
    );
  }
}
