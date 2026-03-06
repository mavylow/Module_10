import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import TableStats from "@components/TableStats";

const mockStats = [
  { month: 0, count: 10, previousCount: 8 },
  { month: 1, count: 15, previousCount: 12 },
  { month: 5, count: 30, previousCount: 25 },
];

describe("TableStats", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders title", () => {
    render(<TableStats title="Statistics" stats={mockStats} />);

    expect(screen.getByText("statistics")).toBeInTheDocument();
  });

  it("renders table rows based on stats", () => {
    render(<TableStats title="Statistics" stats={mockStats} />);

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(mockStats.length);
  });

  it("renders correct month names", () => {
    render(<TableStats title="Statistics" stats={mockStats} />);

    expect(screen.getByText("months.jun")).toBeInTheDocument();
    expect(screen.getByText("months.feb")).toBeInTheDocument();
    expect(screen.getByText("months.jun")).toBeInTheDocument();
  });

  it("renders correct counts and previous counts", () => {
    render(<TableStats title="Statistics" stats={mockStats} />);

    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();

    expect(screen.getByText("15")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();

    expect(screen.getByText("30")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
  });

  it("wraps table with FrameWrapper", () => {
    render(<TableStats title="Statistics" stats={mockStats} />);

    expect(screen.getByTestId("frame-wrapper")).toBeInTheDocument();
    expect(
      screen.getByTestId("frame-wrapper").querySelector("table")
    ).toBeInTheDocument();
  });

  it("renders empty table body when stats array is empty", () => {
    render(<TableStats title="Statistics" stats={[]} />);

    expect(screen.queryAllByRole("row")).toHaveLength(0);
  });
});
