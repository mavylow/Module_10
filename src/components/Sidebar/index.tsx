import { COMMUNITIES, USERS } from "../../TestConsts";
import FrameWrapper from "../FrameWrapper/FrameWrapper";
import { SidebarElement } from "../SidebarElement";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside>
      <FrameWrapper>
        <section className="suggested-people">
          <h3>Suggested people</h3>
          {USERS.slice(0, 5).map((user) => (
            <SidebarElement element={user} />
          ))}
        </section>
        <section className="suggested-communities">
          <h3>Communities you might like</h3>
          {COMMUNITIES.slice(0, 3).map((community) => (
            <SidebarElement element={community} />
          ))}
        </section>
      </FrameWrapper>
    </aside>
  );
}
