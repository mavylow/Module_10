import "./style.css";
import Checkbox from "@components/Checkbox";
import { useEffect, useMemo, useState } from "react";
import { fetchData } from "@utils/apiUtil";
import type { IComment, ILike, IPost, MonthStat } from "@/interfaces";
import StatisticCard from "@components/StatisticCard";
import {
  calculateFullStats,
  getCurrentMonthStats,
} from "@/utils/statisticUtils";
import TableStats from "@/components/TableStats";

const monthStatInitial: MonthStat = {
  month: 0,
  count: 0,
  previousCount: 0,
};

type ITabView = "table" | "chart";

function Statistics() {
  const [tabView, setTabView] = useState<ITabView>("table");

  const [posts, setPosts] = useState<IPost[]>();
  const [likes, setLikes] = useState<ILike[]>();
  const [comments, setComments] = useState<IComment[]>();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [likesRes, commentsRes, postsRes] = await Promise.all([
          fetchData(`/api/me/likes`, "GET"),
          fetchData(`/api/me/comments`, "GET"),
          fetchData(`/api/me/posts`, "GET"),
        ]);
        setLikes(likesRes);
        setComments(commentsRes);
        setPosts(postsRes);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  const likesStats = useMemo(() => {
    if (!likes) {
      return null;
    }
    return calculateFullStats(likes);
  }, [likes]);

  const commentsStats = useMemo(() => {
    if (!comments) {
      return null;
    }
    return calculateFullStats(comments);
  }, [comments]);

  const postsStats = useMemo(() => {
    if (!posts) {
      return null;
    }
    return calculateFullStats(posts);
  }, [posts]);

  const currentMonthStats = useMemo(() => {
    if (!likesStats || !commentsStats || !postsStats) {
      return null;
    }
    return {
      likes: getCurrentMonthStats(new Date(), likesStats) || {
        ...monthStatInitial,
      },
      comments: getCurrentMonthStats(new Date(), commentsStats) || {
        ...monthStatInitial,
      },
      posts: getCurrentMonthStats(new Date(), postsStats) || {
        ...monthStatInitial,
      },
    };
  }, [likesStats, commentsStats, postsStats]);

  const handleToggle = () => {
    setTabView((prev) => (prev === "table" ? "chart" : "table"));
  };

  return (
    <div className="statistics">
      <div className="month">
        {currentMonthStats &&
          Object.entries(currentMonthStats).map(([key, stat]) => {
            if (!stat) return null;

            return (
              <StatisticCard
                key={key}
                title={key}
                count={stat.count}
                prev={stat.previousCount}
              />
            );
          })}
      </div>
      <div className="toggle-view">
        <Checkbox
          onToggle={handleToggle}
          id="chart-view"
          description={
            tabView === "chart" ? "Enable Chart view" : "Enable Table view"
          }
        />
      </div>
      <div className="tables">
        {likesStats && <TableStats title="Likes" stats={likesStats} />}
        {commentsStats && <TableStats title="Comments" stats={commentsStats} />}
      </div>
    </div>
  );
}

export default Statistics;
