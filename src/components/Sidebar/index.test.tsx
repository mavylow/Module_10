import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Sidebar from ".";
import { fetchData } from "@utils/apiUtil";

vi.mock("@utils/apiUtil", () => ({
  fetchData: vi.fn().mockImplementation((url: string) => {
    if (url === "/api/getSuggested") {
      return Promise.resolve(mockUsers);
    }
    if (url === "/api/groups") {
      return Promise.resolve(mockGroups);
    }
  }),
}));

vi.mock("@components/SidebarElement", () => ({
  SidebarElement: ({ element }: any) => (
    <div data-testid="sidebar-element">{element.name}</div>
  ),
}));

vi.mock("@components/FrameWrapper", () => ({
  default: ({ children }: any) => <div>{children}</div>,
}));

const mockUsers = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
}));

const mockGroups = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  name: `Group ${i + 1}`,
}));

describe("Sidebar", () => {
  beforeEach(() => {
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

    expect(fetchData as Mock).toHaveBeenCalledWith("/api/getSuggested", "GET");
    expect(fetchData as Mock).toHaveBeenCalledWith("/api/groups", "GET");
  });

  it("renders only first 5 suggested users", async () => {
    render(<Sidebar />);

    const users = await screen.findAllByTestId("sidebar-element");

    expect(users.length).toBe(8);

    expect(screen.getByText("User 1")).toBeInTheDocument();
    expect(screen.getByText("User 5")).toBeInTheDocument();
    expect(screen.queryByText("User 6")).not.toBeInTheDocument();
  });

  it("renders only first 3 groups", async () => {
    render(<Sidebar />);

    expect(await screen.findByText("Group 1")).toBeInTheDocument();
    expect(screen.getByText("Group 3")).toBeInTheDocument();
    expect(screen.queryByText("Group 4")).not.toBeInTheDocument();
  });

  it("does not crash when API returns null", async () => {
    (fetchData as Mock).mockResolvedValueOnce(null);

    render(<Sidebar />);

    expect(screen.getByText("Suggested people")).toBeInTheDocument();

    expect(screen.getByText("Communities you might like")).toBeInTheDocument();

    expect(screen.queryAllByTestId("sidebar-element").length).toBe(0);
  });
});
