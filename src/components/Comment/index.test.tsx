import { describe, it, expect, vi, beforeEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Comment from "@components/Comment";
import userEvent from "@testing-library/user-event";

vi.mock("@assets/TrashIcon", () => ({
  default: () => <svg data-testid="svg-trash" />,
}));

vi.mock("@components/Button", () => ({
  default: ({ Icon, onButtonClick, type }: any) => (
    <button data-testid="delete-button" onClick={onButtonClick} type={type}>
      <Icon />
    </button>
  ),
}));

const mockComment = {
  id: 5,
  postId: 101,
  authorId: 1,
  text: "Adding detail here.",
  creationDate: "2025-09-04T18:00:00Z",
  modifiedDate: "2025-09-04T18:00:00Z",
};

describe("Comment", () => {
  beforeEach(() => {
    cleanup();
  });
  const mockOnDelete = vi.fn();
  it("comment ui", () => {
    render(
      <Comment
        comment={mockComment}
        number={mockComment.id}
        onDelete={mockOnDelete}
      />
    );
    expect(screen.getByText("Adding detail here.")).toBeInTheDocument();

    const listItem = screen.getByRole("listitem");
    expect(listItem).toHaveAttribute("data-number", "#5.");

    const deleteButton = screen.getByTestId("delete-button");
    expect(deleteButton).toBeInTheDocument();

    expect(screen.getByTestId("svg-trash")).toBeInTheDocument();
  });

  it("call onDelete comment function", async () => {
    const mockOnDelete = vi.fn();

    render(
      <Comment
        comment={mockComment}
        number={mockComment.id}
        onDelete={mockOnDelete}
      />
    );

    const deleteButton = screen.getByTestId("delete-button");

    await userEvent.click(deleteButton);

    expect(mockOnDelete).toBeCalledTimes(1);
  });
});
