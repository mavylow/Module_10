import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Statistics from "@components/Statistics";

const mockPosts = [{ id: 1, createdAt: "2024-01-01" }];
const mockLikes = [{ id: 1, createdAt: "2024-01-01" }];
const mockComments = [{ id: 1, createdAt: "2024-01-01" }];

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

const getStatisticComments = vi.fn();
const getStatisticLikes = vi.fn();
const getStatisticPosts = vi.fn();

vi.mock("@utils/apiUtil", () => ({
  getStatisticComments: () => getStatisticComments(),
  getStatisticLikes: () => getStatisticLikes(),
  getStatisticPosts: () => getStatisticPosts(),
}));

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
}));

import { useQuery } from "@tanstack/react-query";

describe("Statistics", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  function mockAllQueriesLoaded() {
    (useQuery as any)
      .mockReturnValueOnce({
        data: mockPosts,
        isLoading: false,
      })
      .mockReturnValueOnce({
        data: mockLikes,
        isLoading: false,
      })
      .mockReturnValueOnce({
        data: mockComments,
        isLoading: false,
      });
  }

  it("renders statistic cards for current month", async () => {
    mockAllQueriesLoaded();

    render(<Statistics />);

    const cards = await screen.findAllByTestId("stat-card");
    expect(cards).toHaveLength(3);

    expect(screen.getByText("likes")).toBeInTheDocument();
    expect(screen.getByText("comments")).toBeInTheDocument();
    expect(screen.getByText("posts")).toBeInTheDocument();
  });

  it("renders table stats for likes and comments", async () => {
    mockAllQueriesLoaded();

    render(<Statistics />);

    const tables = await screen.findAllByTestId("table-stats");
    expect(tables).toHaveLength(2);

    expect(screen.getByText("Likes")).toBeInTheDocument();
    expect(screen.getByText("Comments")).toBeInTheDocument();
  });

  it("renders checkbox with chart view text by default", async () => {
    mockAllQueriesLoaded();

    render(<Statistics />);

    const checkbox = await screen.findByTestId("checkbox");

    expect(checkbox).toHaveTextContent("Switch to Chart view");
  });

  it("calls API functions via react-query", async () => {
    getStatisticPosts.mockResolvedValue(mockPosts);
    getStatisticLikes.mockResolvedValue(mockLikes);
    getStatisticComments.mockResolvedValue(mockComments);

    (useQuery as any).mockImplementation(
      ({ queryFn }: { queryFn: () => any }) => {
        queryFn();
        return {
          data: [],
          isLoading: false,
        };
      }
    );

    render(<Statistics />);

    expect(getStatisticPosts).toHaveBeenCalledOnce();
    expect(getStatisticLikes).toHaveBeenCalledOnce();
    expect(getStatisticComments).toHaveBeenCalledOnce();
  });
});
