import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Profile from "@pages/Profile";
import { userEvent } from "@testing-library/user-event";
import { useProfilePage } from "@/store/profileStore";

import "@testing-library/jest-dom/vitest";

vi.mock("@components/ProfileInfo", () => ({
  default: () => <div data-testid="profile-info"></div>,
}));

vi.mock("@components/Statistics", () => ({
  default: () => <div data-testid="statistics"></div>,
}));

describe("Profile", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("render profile ui correctly", () => {
    render(<Profile />);

    expect(screen.getByText("profileInfo")).toBeInTheDocument();
    expect(screen.getByText("statistics")).toBeInTheDocument();
  });

  it("navigate to pages", async () => {
    const user = userEvent.setup();

    render(<Profile />);

    await user.click(screen.getByText("profileInfo"));
    expect(useProfilePage().changePage).toHaveBeenCalledWith("info");

    await user.click(screen.getByText("statistics"));
    expect(useProfilePage().changePage).toHaveBeenCalledWith("statistics");
  });

  it("render different children", () => {
    vi.mocked(useProfilePage).mockReturnValue({
      profilePage: "statistics",
      changePage: vi.fn(),
    });
    render(<Profile />);

    expect(screen.queryByTestId("profile-info")).not.toBeInTheDocument();
    expect(screen.getByTestId("statistics")).toBeInTheDocument();
  });
});
