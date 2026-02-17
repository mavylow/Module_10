import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import CreatePost from "@components/CreatePost";
import type { IUser } from "@/interfaces";
import { AuthContext } from "@/providers/AuthProvider";
import userEvent from "@testing-library/user-event";
import { fetchData } from "@utils/apiUtil";

vi.mock("@assets/EditPenIcon", () => ({
  default: () => <svg data-testid={"edit-pen-icon"} />,
}));
vi.mock("@assets/MailIcon", () => ({
  default: () => <svg data-testid={"mail-icon"} />,
}));
vi.mock("@assets/UploadFileIcon", () => ({
  default: () => <svg data-testid={"upload-icon"} />,
}));
vi.mock("@assets/CrossIcon", () => ({
  default: () => <svg data-testid={"cross-icon"} />,
}));

vi.mock("@utils/apiUtil", () => ({
  fetchData: vi.fn(),
}));

const mockedFetchData = vi.mocked(fetchData);

const mockAuthContext = {
  signIn: vi.fn(),
  signUp: vi.fn(),
  updateUser: vi.fn(),
  logOut: vi.fn(),
};

const mockUser = {
  id: 1,
  username: "helenahills",
  firstName: "Helena",
  secondName: "Hills",
  email: "helena.hills@social.com",
  description: "Travel and design enthusiast.",
  profileImage: "/assets/user-helena.png",
  lastLogin: "2025-10-02T12:00:00Z",
  creationDate: "2023-11-01T09:00:00Z",
  modifiedDate: "2025-10-02T12:00:00Z",
};

const renderWithProvider = (user: IUser | null) => {
  const onAdd = vi.fn();
  render(
    <AuthContext.Provider value={{ user, ...mockAuthContext }}>
      <CreatePost onAdd={onAdd} />
    </AuthContext.Provider>
  );
};

describe("CreatePost", () => {
  afterEach(() => {
    cleanup();
  });
  it("create post with close modal", () => {
    renderWithProvider(mockUser);
  });

  it("handle show add post modal", async () => {
    renderWithProvider(mockUser);

    const tellEveryoneButton = screen.getByTestId("button");

    await userEvent.click(tellEveryoneButton);

    expect(screen.getByText("Create a new post")).toBeInTheDocument();
    expect(screen.getByTestId("add-post-form")).toBeInTheDocument();
    expect(screen.getByTestId("cross-icon")).toBeInTheDocument();
    expect(screen.getByTestId("input")).toBeInTheDocument();
    expect(screen.getByTestId("textarea")).toBeInTheDocument();
    expect(screen.getByTestId("upload-icon")).toBeInTheDocument();
    expect(screen.getByText("Create")).toBeInTheDocument();
  });

  it("closes modal when close button is clicked", async () => {
    renderWithProvider(mockUser);

    const tellEveryoneButton = screen.getByTestId("button");
    await userEvent.click(tellEveryoneButton);

    expect(screen.getByText("Create a new post")).toBeInTheDocument();

    const closeButton = screen.getByTestId("cross-icon").closest("button");
    expect(closeButton).toBeInTheDocument();
    await userEvent.click(closeButton!);

    expect(screen.queryByText("Create a new post")).not.toBeInTheDocument();
  });

  it("add new post", async () => {
    renderWithProvider(mockUser);

    const tellEveryoneButton = screen.getByTestId("button");
    await userEvent.click(tellEveryoneButton);

    const createButton = screen.getByText("Create");

    expect(screen.getByText("Create a new post")).toBeInTheDocument();

    await userEvent.type(screen.getByTestId("input"), "Post title");
    await userEvent.type(screen.getByTestId("textarea"), "Post description");

    const validFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
    const fileInput = screen.getByLabelText(/Select a file/i);
    await userEvent.upload(fileInput, validFile);

    await userEvent.click(createButton);
    expect(mockedFetchData).toHaveBeenCalledWith("/api/posts", "POST", {
      title: "Post title",
      description: "Post description",
      image: expect.stringMatching(/^blob:/),
    });

    expect(screen.queryByTestId("add-post-form")).not.toBeInTheDocument();
  });
});
