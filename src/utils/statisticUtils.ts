import type {
  IComment,
  ILike,
  IPost,
  MonthStat,
  YearStats,
} from "@/interfaces";

export const calculateFullStats = (
  data: IComment[] | ILike[] | IPost[]
): YearStats => {
  const filterByMonthYear = (
    item: IComment | ILike | IPost,
    month: number,
    year: number
  ): boolean => {
    const date = new Date(item.creationDate);
    return date.getMonth() === month && date.getFullYear() === year;
  };

  const allYears = Array.from(
    new Set(data.map((el) => new Date(el.creationDate).getFullYear()))
  ).sort((a, b) => a - b);

  const result: YearStats = {};

  allYears.forEach((year) => {
    const yearStats: MonthStat[] = [];

    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      const currentMonthData = data.filter((item) =>
        filterByMonthYear(item, monthIndex, year)
      );

      let prevMonthIndex = monthIndex - 1;
      let prevMonthYear = year;

      if (monthIndex === 0) {
        prevMonthIndex = 11;
        prevMonthYear = year - 1;
      }

      const previousMonthData = data.filter((item) =>
        filterByMonthYear(item, prevMonthIndex, prevMonthYear)
      );

      yearStats.push({
        month: monthIndex,
        count: currentMonthData.length,
        previousCount: previousMonthData.length,
      });
    }

    result[year] = yearStats;
  });

  return result;
};

export const getCurrentMonthStats = (
  date: Date,
  data: YearStats
): MonthStat | null => {
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  return (
    data[currentYear]?.find((month) => month.month === currentMonth) ?? null
  );
};
