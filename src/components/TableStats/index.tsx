import type { MonthStat } from "@/interfaces";
import "./style.css";
import FrameWrapper from "@components/FrameWrapper";
import { useTranslation } from "react-i18next";

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

function TableStats({ title, stats }: ITableStats) {
  const { t } = useTranslation();

  return (
    <div className="table-statistics">
      <h2> {t(title.toLocaleLowerCase())} </h2>
      <FrameWrapper>
        <table>
          <tbody>
            {stats &&
              stats.map((m: MonthStat) => (
                <tr key={`${m.month}`}>
                  <td>{t(`months.${MONTH_NAMES[m.month]}`)}</td>
                  <td>{m.count}</td>
                  <td>{m.previousCount}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </FrameWrapper>
    </div>
  );
}

export default TableStats;
