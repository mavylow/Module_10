import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Profile from "@pages/Profile";
import { userEvent } from "@testing-library/user-event";
import { ProfilePageContext } from "@/store/profileStore";
import "@testing-library/jest-dom/vitest";
import type { TProfilePages } from "@/interfaces";

vi.mock("@components/ProfileInfo", () => ({
  default: () => <div data-testid="profile-info"></div>,
}));

vi.mock("@components/Statistics", () => ({
  default: () => <div data-testid="statistics"></div>,
}));

const mockChangePage = vi.fn();

const renderWithContext = (page: TProfilePages) => {
  render(
    <ProfilePageContext.Provider
      value={{ profilePage: page, changePage: mockChangePage }}
    >
      <Profile />
    </ProfilePageContext.Provider>
  );
};

describe("Profile", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  it("render profile ui correctly", () => {
    renderWithContext("info");
    expect(screen.getByText("Profile Info")).toBeInTheDocument();
    expect(screen.getByText("Statistic")).toBeInTheDocument();
  });

  it("navigate to pages", async () => {
    const user = userEvent.setup();

    renderWithContext("info");

    const infoLink = screen.getByText("Profile Info");
    const statisticsLink = screen.getByText("Statistic");

    await user.click(infoLink);

    expect(mockChangePage).toHaveBeenCalledTimes(1);
    expect(mockChangePage).toHaveBeenCalledWith("info");

    await user.click(statisticsLink);

    expect(mockChangePage).toHaveBeenCalledTimes(2);
    expect(mockChangePage).toHaveBeenCalledWith("statistics");
  });

  it("render different children", async () => {
    renderWithContext("info");

    expect(screen.getByTestId("profile-info")).toBeInTheDocument();

    cleanup();

    renderWithContext("statistics");

    expect(screen.queryByTestId("profile-info")).not.toBeInTheDocument();
    expect(screen.getByTestId("statistics")).toBeInTheDocument();
  });
});
