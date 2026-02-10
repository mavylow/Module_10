import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { SidebarElement } from "@components/SidebarElement";

const mockGroup = {
  id: 1,
  photo: "/group-1.jpg",
  title: "Frontend Group",
  membersCount: 128,
};
const mockUser = {
  id: 1,
  username: "helena",
  firstName: "Helena",
  secondName: "Stone",
  description:
    "Team lead overseeing product development and architecture across multiple platforms.",
  photo: "/user.png",
};
describe("SidebarElement", () => {
  it("sidebar group", () => {
    const { container } = render(<SidebarElement element={mockGroup} />);
    expect(
      screen.getByRole("heading", { name: /Frontend Group/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/128/)).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it("sidebar user", () => {
    const { container } = render(<SidebarElement element={mockUser} />);
    expect(screen.getByText(/helena/)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Helena Stone/i })
    ).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
