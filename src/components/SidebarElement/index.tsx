import type { IGroup, ISidebarUser } from "@/interfaces";
import "./style.css";

interface SidebarElementProps {
  element: IGroup | ISidebarUser;
}

export function SidebarElement({ element }: SidebarElementProps) {
  if ("membersCount" in element) {
    return (
      <div className="aside-element">
        <img src={element.photo} alt="suggested group avatar image" />
        <h3>{element.title}</h3>
        <span>{element.membersCount}</span>
      </div>
    );
  }

  if ("username" in element) {
    return (
      <div className="aside-element">
        <img src={element.photo} alt="suggested user avatar image" />
        <h3>
          {element.firstName} {element.secondName}
        </h3>
        <span>@{element.username}</span>
      </div>
    );
  }
}
