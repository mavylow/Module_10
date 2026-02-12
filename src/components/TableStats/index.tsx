import type { MonthStat } from "@/interfaces";
import "./style.css";
import FrameWrapper from "@components/FrameWrapper";

interface ITableStats {
  title: string;
  stats: MonthStat[];
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
              stats.map((m: MonthStat) => (
                <tr key={`${m.month}`}>
                  <td>{MONTH_NAMES[m.month]}</td>
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
