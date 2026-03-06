import { describe, it, expect, vi, beforeEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Comment from "@components/Comment";
import userEvent from "@testing-library/user-event";
import { mockComment } from "@/tests/consts";

vi.mock("@components/Button", () => ({
  default: ({ Icon, onButtonClick, type }: any) => (
    <button data-testid="delete-button" onClick={onButtonClick} type={type}>
      <Icon />
    </button>
  ),
}));

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

    expect(screen.getByText("Adding detail here.")).toBeInTheDocument();
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
