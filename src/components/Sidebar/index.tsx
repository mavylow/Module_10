import { COMMUNITIES, USERS } from "@/TestConsts";
import FrameWrapper from "@components/FrameWrapper";
import { SidebarElement } from "@components/SidebarElement";
import "./style.css";

export default function Sidebar() {
  return (
    <aside>
      <FrameWrapper>
        <section className="suggested-people">
          <h3>Suggested people</h3>
          {USERS.slice(0, 5).map((user) => (
            <SidebarElement key={user.userId} element={user} />
          ))}
        </section>
        <section className="suggested-communities">
          <h3>Communities you might like</h3>
          {COMMUNITIES.slice(0, 3).map((community) => (
            <SidebarElement key={community.name} element={community} />
          ))}
        </section>
      </FrameWrapper>
    </aside>
  );
}
