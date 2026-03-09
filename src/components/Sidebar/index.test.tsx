import { describe, it, expect, vi, type Mock, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Sidebar from ".";
import { useQuery } from "@tanstack/react-query";

vi.mock("@components/SidebarElement", () => ({
  SidebarElement: ({ element }: any) => (
    <div data-testid="sidebar-element">
      {element.name || `${element.firstName} ${element.secondName}`}
    </div>
  ),
}));

vi.mock("@components/FrameWrapper", () => ({
  default: ({ children }: any) => <div>{children}</div>,
}));

describe("Sidebar", () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("renders section titles", () => {
    render(<Sidebar />);

    expect(screen.getByText("Suggested people")).toBeInTheDocument();

    expect(screen.getByText("Communities you might like")).toBeInTheDocument();
  });

  it("calls fetchData for suggested users and groups", async () => {
    render(<Sidebar />);

    expect(useQuery).toBeCalledTimes(2);
  });

  it("renders only first 5 suggested users", async () => {
    render(<Sidebar />);

    const users = await screen.findAllByTestId("sidebar-element");

    expect(users.length).toBe(9);

    expect(screen.getByText("User 1")).toBeInTheDocument();
    expect(screen.getByText("User 5")).toBeInTheDocument();
    expect(screen.queryByText("User 6")).not.toBeInTheDocument();
  });

  it("renders only first 4 groups", async () => {
    render(<Sidebar />);

    expect(await screen.findByText("Group 1")).toBeInTheDocument();
    expect(screen.getByText("Group 3")).toBeInTheDocument();
    expect(screen.queryByText("Group 4")).toBeInTheDocument();
    expect(screen.queryByText("Group 5")).not.toBeInTheDocument();
  });

  it("does not crash when API returns null", async () => {
    vi.mocked(useQuery as Mock)
      .mockReturnValueOnce({ data: null, isLoading: false })
      .mockReturnValueOnce({
        data: null,
        isLoading: false,
      });

    render(<Sidebar />);

    expect(screen.getByText("Suggested people")).toBeInTheDocument();

    expect(screen.getByText("Communities you might like")).toBeInTheDocument();

    expect(screen.queryAllByTestId("sidebar-element").length).toBe(0);
  });
});
