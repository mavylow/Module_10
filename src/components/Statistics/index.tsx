import "./style.css";
import Checkbox from "@components/Checkbox";
import { useMemo, useState } from "react";
import {
  getStatisticComments,
  getStatisticLikes,
  getStatisticPosts,
} from "@utils/apiUtil";
import type { IComment, ILike, IPost, MonthStat } from "@/interfaces";
import StatisticCard from "@components/StatisticCard";
import { Box, Skeleton, Table, TableCell, TableRow } from "@mui/material";
import {
  calculateFullStats,
  getCurrentMonthStats,
} from "@/utils/statisticUtils";
import TableStats from "@/components/TableStats";
import { useQuery } from "@tanstack/react-query";

const monthStatInitial: MonthStat = {
  month: 0,
  count: 0,
  previousCount: 0,
};

const yearStatInitial: MonthStat[] = Array.from({ length: 12 }, (_, i) => {
  return {
    month: i,
    count: 0,
    previousCount: 0,
  };
});

type ITabView = "table" | "chart";

function Statistics() {
  const [tabView, setTabView] = useState<ITabView>("table");

  const { data: posts, isLoading: isPostsLoading } = useQuery<IPost[]>({
    queryKey: ["posts"],
    queryFn: () => getStatisticPosts(),
  });
  const { data: likes, isLoading: isLikesLoading } = useQuery<ILike[]>({
    queryKey: ["likes"],
    queryFn: () => getStatisticLikes(),
  });

  const { data: comments, isLoading: isCommentsLoading } = useQuery<IComment[]>(
    {
      queryKey: ["comments"],
      queryFn: () => getStatisticComments(),
    }
  );

  const isDataLoading = useMemo(() => {
    return isCommentsLoading || isLikesLoading || isPostsLoading;
  }, [isCommentsLoading, isLikesLoading, isPostsLoading]);

  const likesStats = useMemo(() => {
    if (isLikesLoading) {
      return null;
    }
    if (!likes) {
      return [];
    }
    return calculateFullStats(likes);
  }, [likes]);

  const commentsStats = useMemo(() => {
    if (isCommentsLoading) {
      return null;
    }
    if (!comments) {
      return [];
    }
    return calculateFullStats(comments);
  }, [comments]);

  const postsStats = useMemo(() => {
    if (isPostsLoading) {
      return null;
    }
    if (!posts) {
      return [];
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

  if (isDataLoading) {
    return (
      <div className="statistics">
        <div className="month">
          {[1, 2, 3].map((i) => (
            <StatisticCardSkeleton key={i} />
          ))}
        </div>
        <div className="toggle-view">
          <Skeleton variant="text" width={200} height={40} />
        </div>
        <div className="tables">
          {[1, 2].map((i) => (
            <TableStatsSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="statistics">
      <div className="month">
        {currentMonthStats &&
          Object.entries(currentMonthStats).map(([key, stat]) => (
            <StatisticCard
              key={key}
              title={key}
              count={stat.count}
              prev={stat.previousCount}
            />
          ))}
      </div>

      <div className="toggle-view">
        <Checkbox
          onToggle={handleToggle}
          id="chart-view"
          description={
            tabView === "chart"
              ? "Switch to Table view"
              : "Switch to Chart view"
          }
        />
      </div>

      <div className="tables">
        {tabView === "table" ? (
          <>
            {likesStats && (
              <TableStats
                title="Likes"
                stats={
                  likesStats[`${new Date().getFullYear()}`] || yearStatInitial
                }
              />
            )}
            {commentsStats && (
              <TableStats
                title="Comments"
                stats={
                  commentsStats[`${new Date().getFullYear()}`] ||
                  yearStatInitial
                }
              />
            )}
          </>
        ) : (
          <div>Chart view coming soon...</div>
        )}
      </div>
    </div>
  );
}

export default Statistics;

const StatisticCardSkeleton = () => {
  return (
    <div className="frame">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(8px, 1.2vw, 16px)",
        }}
      >
        <Skeleton variant="text"></Skeleton>
        <Skeleton variant="text" height={30}></Skeleton>
        <Skeleton variant="text"></Skeleton>
      </Box>
    </div>
  );
};

const TableStatsSkeleton = () => {
  return (
    <div className="table-statistics">
      <Skeleton
        variant="text"
        height={"clamp(28px, 2.5vw, 38px)"}
        width={"40%"}
      />
      <div className="frame">
        <Table sx={{ "&:last-child tr": { border: 0 } }}>
          {Array.from({ length: 12 }, (_, i) => i).map((el) => (
            <TableRow
              key={el}
              sx={{
                borderBottom: `1px solid var(--border-color)`,
              }}
            >
              <TableCell width="60%" padding="none" height={27}>
                <Skeleton variant="text" width={"80%"} />
              </TableCell>
              <TableCell align="right" width="20%" padding="none" height={27}>
                <Skeleton variant="text" width={"50%"} />
              </TableCell>
              <TableCell align="right" width="20%" padding="none" height={27}>
                <Skeleton variant="text" width={"50%"} />
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </div>
    </div>
  );
};
