import type { MonthStat, YearStats } from "@/interfaces";
import "./style.css";
import FrameWrapper from "@components/FrameWrapper";

interface ITableStats {
  title: string;
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

function TableStats({ title, stats }: ITableStats) {
  return (
    <div className="table-statistics">
      <h2> {title} </h2>
      <FrameWrapper>
        <table>
          <tbody>
            {stats &&
              Object.entries(stats).map(([year, months]) =>
                months.map((m: MonthStat) => (
                  <tr key={`${year}-${m.month}`}>
                    <td>{MONTH_NAMES[(m.month + 1) % 12]}</td>
                    <td>{m.count}</td>
                    <td>{m.previousCount}</td>
                  </tr>
                ))
              )}
          </tbody>
        </table>
      </FrameWrapper>
    </div>
  );
}

export default TableStats;
