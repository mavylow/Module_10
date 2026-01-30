import type { IGroup, ISidebarUser } from "@/TestConsts";
import "./style.css";

interface SidebarElementProps {
  element: IGroup | ISidebarUser;
}

export function SidebarElement({ element }: SidebarElementProps) {
  if ("membersCount" in element) {
    return (
      <div className="aside-element">
        <img src={element.photo} />
        <h3>{element.title}</h3>
        <span>{element.membersCount}</span>
      </div>
    );
  }
  if ("username" in element) {
    return (
      <div className="aside-element">
        <img src={element.photo} />
        <h3>
          {element.firstName} {element.secondName}
        </h3>
        <span>@{element.username}</span>
      </div>
    );
  }
}
