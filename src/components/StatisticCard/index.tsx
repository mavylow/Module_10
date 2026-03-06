import React from "react";
import FrameWrapper from "@components/FrameWrapper";
import "./style.css";
import { useTranslation } from "react-i18next";

interface IStatisticCard {
  title: string;
  count: number;
  prev: number;
}

function StatisticCard({ title, count, prev }: IStatisticCard) {
  const { t } = useTranslation();
  const diff = count - prev;
  const percent = prev === 0 ? 100 : Math.round((diff / prev) * 100);

  return (
    <FrameWrapper>
      <div className="card">
        <h3>{t(title).toLocaleLowerCase()}</h3>
        <p>{count}</p>
        <small data-testid="monthStat">
          +{percent}% {t("monthStat")}
        </small>
      </div>
    </FrameWrapper>
  );
}

export default React.memo(StatisticCard);
