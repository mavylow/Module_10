import type { MonthStat, YearStats } from "@/interfaces";
import "./style.css";
import FrameWrapper from "../FrameWrapper";

interface ITableStats {
  stats: YearStats;
}

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function TableStats({ stats }: ITableStats) {
  return (
    <FrameWrapper>
      <table>
        <tbody>
          {stats &&
            Object.entries(stats).map(([year, months]) =>
              months.map((m: MonthStat) => (
                <tr key={`${year}-${m.month}`}>
                  <td>{year}</td>
                  <td>{MONTH_NAMES[(m.month + 1) % 12]}</td>
                  <td>{m.count}</td>
                  <td>{m.previousCount}</td>
                </tr>
              ))
            )}
        </tbody>
      </table>
    </FrameWrapper>
  );
}

export default TableStats;
