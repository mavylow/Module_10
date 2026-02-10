import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Comment from "@components/Comment";

describe("Comment", () => {
  const comment = {
    id: 5,
    postId: 101,
    authorId: 1,
    text: "Adding detail here.",
    creationDate: "2025-09-04T18:00:00Z",
    modifiedDate: "2025-09-04T18:00:00Z",
  };
  it("Simple comment", () => {
    render(
      <Comment comment={comment} number={comment.id} onDelete={() => {}} />
    );
    expect(screen.getByText("Adding detail here.")).toBeInTheDocument();
  });
});
