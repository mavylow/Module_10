import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import StatisticCard from "@components/StatisticCard";

describe("StatisticCard", () => {
  afterEach(() => {
    cleanup();
  });
  it("renders title, count and percentage correctly", () => {
    render(<StatisticCard title="Likes" count={10} prev={5} />);

    expect(screen.getByText("likes")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByTestId(`monthStat`)).toBeInTheDocument();
  });

  it("handles zero previous count correctly", () => {
    render(<StatisticCard title="Comments" count={5} prev={0} />);

    expect(screen.getByText("comments")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByTestId(`monthStat`)).toBeInTheDocument();
  });

  it("calculates negative growth correctly", () => {
    render(<StatisticCard title="Posts" count={2} prev={4} />);

    expect(screen.getByText("posts")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText(/-50%/)).toBeInTheDocument();
  });
});
