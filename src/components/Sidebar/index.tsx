import FrameWrapper from "@components/FrameWrapper";
import { SidebarElement } from "@components/SidebarElement";
import "./style.css";
import { useState, useEffect } from "react";
import { fetchData } from "@/utils/apiUtil";
import type { IGroup, ISidebarUser } from "@/interfaces";

export default function Sidebar() {
  const [groups, setGroups] = useState<IGroup[] | null>(null);
  const [suggestedUser, setSuggestedUser] = useState<ISidebarUser[] | null>(
    null
  );

  const getSuggestedUser = async () => {
    const suggestedUser = await fetchData("/api/getSuggested", "GET");
    setSuggestedUser(suggestedUser);
  };

  const getGroup = async () => {
    const groups = await fetchData("/api/groups", "GET");
    setGroups(groups);
  };

  useEffect(() => {
    getSuggestedUser();
    getGroup();
  }, []);

  return (
    <aside>
      <FrameWrapper>
        <section className="suggested-people">
          <h3>Suggested people</h3>
          {suggestedUser?.slice(0, 5).map((user) => (
            <SidebarElement key={user.id} element={user} />
          ))}
        </section>
      </FrameWrapper>
      <FrameWrapper>
        <section className="suggested-communities">
          <h3>Communities you might like</h3>
          {groups?.slice(0, 3).map((community) => (
            <SidebarElement key={community.id} element={community} />
          ))}
        </section>
      </FrameWrapper>
    </aside>
  );
}
