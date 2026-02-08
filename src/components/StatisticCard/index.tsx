import React from "react";
import FrameWrapper from "@components/FrameWrapper";
import "./style.css";

interface IStatisticCard {
  title: string;
  count: number;
  prev: number;
}

function StatisticCard({ title, count, prev }: IStatisticCard) {
  const diff = count - prev;
  const percent = prev === 0 ? 100 : Math.round((diff / prev) * 100);

  return (
    <FrameWrapper>
      <div className="card">
        <h3>{title}</h3>
        <p>{count}</p>
        <small> +{percent}% month over month</small>
      </div>
    </FrameWrapper>
  );
}

export default React.memo(StatisticCard);
