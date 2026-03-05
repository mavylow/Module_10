import { useTranslation } from "react-i18next";
import FrameWrapper from "@components/FrameWrapper";
import type { MonthStat } from "@/interfaces";
import { BarChart } from "@mui/x-charts/BarChart";

interface ITableStats {
  title: string;
  stats: MonthStat[];
}

const MONTH_NAMES = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

export function ChartStats({ title, stats }: ITableStats) {
  const { t } = useTranslation();
  return (
    <div className="table-statistics">
      <h2> {t(title.toLocaleLowerCase())} </h2>
      <FrameWrapper>
        <BarChart
          xAxis={[{ data: MONTH_NAMES, max: 5 }]}
          yAxis={[
            {
              tickMinStep: 1,
              min: 0,
              max: 10,
            },
          ]}
          series={[
            {
              data: stats.map((item) => item.count),
              color: "var(--border-color)",
            },
          ]}
          grid={{ horizontal: true }}
          height={448}
          sx={{
            "& .MuiChartsAxis-root line": {
              stroke: "var(--text-color)",
            },
            "& .MuiChartsAxis-root path": {
              stroke: "var(--text-color)",
            },
            "& .MuiChartsAxis-root text": {
              fill: "var(--text-color)",
            },
          }}
        />
      </FrameWrapper>
    </div>
  );
}
