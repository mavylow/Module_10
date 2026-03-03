import type { IComment, ILike, IPost } from "@/interfaces";

interface formattedDateT {
  key: string,
  count?: number
  date?: string
}

export function formattedDate(date: string): formattedDateT{

  const ms = new Date(date).getTime()
  const diffMs = Date.now() - ms
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffWeek / 4);

  if (diffSec < 60) return {key: "time.now"};
  if (diffMin < 60) return {key: "time.minute", count:diffMin };
  if (diffHour < 24) return {key: "time.hour", count:diffHour };
  if (diffDay < 7) return {key: "time.day", count:diffDay };
  if (diffWeek < 4) return {key: "time.week", count:diffWeek };
  if (diffMonth < 12) return {key: "time.month", count:diffMonth };

  return {key: "time.fullDate", date: new Date(date).toLocaleDateString()}
}

export function filterByMonth(el: ILike | IPost | IComment, month: number): boolean {
  const creationMonth = new Date(el.creationDate).getMonth();
  if (creationMonth === month) {
    return true;
  }
  return false;
}