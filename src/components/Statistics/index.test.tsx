import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Statistics from "@components/Statistics";

vi.mock("@components/Checkbox", () => ({
  default: ({ description }: { description: string }) => (
    <div data-testid="checkbox">{description}</div>
  ),
}));

vi.mock("@components/StatisticCard", () => ({
  default: ({
    title,
    count,
    prev,
  }: {
    title: string;
    count: number;
    prev: number;
  }) => (
    <div data-testid="stat-card">
      <span>{title}</span>
      <span>{count}</span>
      <span>{prev}</span>
    </div>
  ),
}));

vi.mock("@components/TableStats", () => ({
  default: ({ title }: { title: string }) => (
    <div data-testid="table-stats">{title}</div>
  ),
}));

vi.mock("@/utils/statisticUtils", () => ({
  calculateFullStats: vi.fn(() => ({
    [new Date().getFullYear()]: Array.from({ length: 12 }, (_, i) => ({
      month: i,
      count: i + 1,
      previousCount: i,
    })),
  })),
  getCurrentMonthStats: vi.fn(() => ({
    month: new Date().getMonth(),
    count: 5,
    previousCount: 3,
  })),
}));

/* ───────── api ───────── */

vi.mock("@utils/apiUtil", () => ({
  fetchData: vi.fn((url: string) => {
    if (url.includes("likes")) return Promise.resolve([{}]);
    if (url.includes("comments")) return Promise.resolve([{}]);
    if (url.includes("posts")) return Promise.resolve([{}]);
    return Promise.resolve([]);
  }),
}));

/* ───────── tests ───────── */

describe("Statistics", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders statistic cards for current month", async () => {
    render(<Statistics />);

    const cards = await screen.findAllByTestId("stat-card");
    expect(cards).toHaveLength(3);

    expect(screen.getByText("likes")).toBeInTheDocument();
    expect(screen.getByText("comments")).toBeInTheDocument();
    expect(screen.getByText("posts")).toBeInTheDocument();
  });

  it("renders table stats for likes and comments", async () => {
    render(<Statistics />);

    const tables = await screen.findAllByTestId("table-stats");
    expect(tables).toHaveLength(2);

    expect(screen.getByText("Likes")).toBeInTheDocument();
    expect(screen.getByText("Comments")).toBeInTheDocument();
  });

  it("renders checkbox with table view text by default", async () => {
    render(<Statistics />);

    const checkbox = await screen.findByTestId("checkbox");
    expect(checkbox).toHaveTextContent("Enable Table view");
  });

  it("fetches likes, comments and posts on mount", async () => {
    const { fetchData } = await import("@utils/apiUtil");

    render(<Statistics />);

    expect(fetchData).toHaveBeenCalledWith("/api/me/likes", "GET");
    expect(fetchData).toHaveBeenCalledWith("/api/me/comments", "GET");
    expect(fetchData).toHaveBeenCalledWith("/api/me/posts", "GET");
  });
});
