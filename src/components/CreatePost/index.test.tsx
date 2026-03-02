import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import CreatePost from "@components/CreatePost";
import authReducer from "@/slices/authSlice";
import userEvent from "@testing-library/user-event";
import { addPostsAxios } from "@utils/apiUtil";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

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

vi.mock("@utils/apiUtil", async () => {
  const actual = vi.importActual("@utils/apiUtil");
  return {
    ...actual,
    addPostsAxios: vi.fn(),
  };
});

const mockedFetchData = vi.mocked(addPostsAxios);

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        user: null,
        isAuth: false,
        isLoading: false,
        error: null,
        ...initialState,
      },
    },
  });
};

const renderComponent = (store = createTestStore()) => {
  const onAdd = vi.fn();
  return render(
    <Provider store={store}>
      <CreatePost onAdd={onAdd} />
    </Provider>
  );
};

const mockCreateObjectURL = vi.fn();
vi.stubGlobal("URL", {
  createObjectURL: mockCreateObjectURL,
});

vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useSelector: () => false,
  };
});

describe("CreatePost", () => {
  afterEach(() => {
    cleanup();
  });
  it("create post with close modal", () => {
    renderComponent();
  });

  it("handle show add post modal", async () => {
    renderComponent();

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
    renderComponent();

    const tellEveryoneButton = screen.getByTestId("button");
    await userEvent.click(tellEveryoneButton);

    expect(screen.getByText("Create a new post")).toBeInTheDocument();

    const closeButton = screen.getByTestId("cross-icon").closest("button");
    expect(closeButton).toBeInTheDocument();
    await userEvent.click(closeButton!);

    expect(screen.queryByText("Create a new post")).not.toBeInTheDocument();
  });

  it("add new post", async () => {
    renderComponent();
    const mockBlob = "blob:nodedata:6897ba45-86a6-4b9e-97ed-e7636d638d29";
    (URL.createObjectURL as any).mockReturnValue(mockBlob);
    const tellEveryoneButton = screen.getByTestId("button");
    await userEvent.click(tellEveryoneButton);

    const createButton = screen.getByText("Create");

    expect(screen.getByText("Create a new post")).toBeInTheDocument();

    await userEvent.type(screen.getByTestId("input"), "Post title");
    await userEvent.type(screen.getByTestId("textarea"), "Post description");

    const validFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
    const fileInput = screen.getByLabelText(/Select a file/i);
    await userEvent.upload(fileInput, validFile);

    const newPost = {
      title: "Post title",
      content: "Post description",
      image: mockBlob,
    };

    await userEvent.click(createButton);
    expect(mockedFetchData).toHaveBeenCalledWith(JSON.stringify(newPost));

    expect(screen.queryByTestId("add-post-form")).not.toBeInTheDocument();
  });
});
