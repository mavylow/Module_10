import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import SignUp from "@pages/auth/SignUp";
import { userEvent } from "@testing-library/user-event";
import authReducer from "@/slices/authSlice";
import "@testing-library/jest-dom/vitest";
import type { ReactNode } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

vi.mock("@assets/MailIcon", () => ({
  default: () => <svg data-testid="mail-icon" />,
}));

vi.mock("@assets/EyeCrossedIcon", () => ({
  default: () => <svg data-testid="eye-close-icon" />,
}));

vi.mock("@assets/EyeOpenIcon", () => ({
  default: () => <svg data-testid="eye-open-icon" />,
}));
vi.mock("@assets/ErrorWarningIcon", () => ({
  default: () => <svg data-testid="error-warning-icon" />,
}));

vi.mock("@assets/ThumbUpIcon", () => ({
  default: () => <svg data-testid="thumb-up-icon" />,
}));

vi.mock("@assets/CheckIcon", () => ({
  default: () => <svg data-testid="check-icon" />,
}));

vi.mock("@assets/CrossIcon", () => ({
  default: () => <svg data-testid="cross-icon" />,
}));

const mockNavigate = vi.fn();

vi.mock("react-router", () => {
  const actual = vi.importActual("react-router");
  return {
    ...actual,
    NavLink: ({ to, children }: { to: string; children: ReactNode }) => (
      <a
        onClick={(e) => {
          e.preventDefault();
          mockNavigate(to);
        }}
      >
        {children}
      </a>
    ),
    useNavigate: () => {
      navigate: vi.fn();
    },
  };
});

const mockDispatch = vi.fn();

vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useDispatch: () => mockDispatch,
    useSelector: () => false,
  };
});

const mockSignUpAction = vi.fn();

vi.mock("@/slices/authSlice", async () => {
  const actual = await vi.importActual("@/slices/authSlice");
  return {
    ...actual,
    signUp: vi.fn(() => mockSignUpAction),
  };
});

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
  return render(
    <Provider store={store}>
      <SignUp />
    </Provider>
  );
};

describe("SignUp", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders sign in page data correctly", () => {
    renderComponent();

    expect(screen.getByText("Create an account")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument();
    expect(screen.getByTestId("mail-icon")).toBeInTheDocument();
    expect(screen.getAllByTestId("eye-open-icon")).toHaveLength(2);
  });

  it("allows user to sign in data and submit form", async () => {
    const user = userEvent.setup();
    renderComponent();

    const emailInput = screen.getByPlaceholderText("Enter email");

    await user.clear(emailInput);
    await user.type(emailInput, "newusername@gmail.com");

    await user.click(screen.getByRole("button", { name: /sign up/i }));
    expect(await screen.findByTestId("check-icon")).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText("Enter password");

    await user.clear(passwordInput);
    await user.type(passwordInput, "password128");

    expect(
      await screen.findByText("Your password is strong")
    ).toBeInTheDocument();
    expect(await screen.findByTestId("thumb-up-icon")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /sign up/i }));

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(mockSignUpAction);
  });

  it("shows validation error when email is too wrong", async () => {
    const user = userEvent.setup();
    renderComponent();

    const emailInput = screen.getByPlaceholderText("Enter email");

    await user.clear(emailInput);
    await user.type(emailInput, "newuser.com");

    await user.click(screen.getByRole("button", { name: /sign up/i }));
    expect(await screen.findByText("Email is not valid")).toBeInTheDocument();

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it("shows validation error when email is too wrong", async () => {
    const user = userEvent.setup();
    renderComponent();

    const passwordInput = screen.getByPlaceholderText("Enter password");

    await user.clear(passwordInput);
    await user.type(passwordInput, "password");

    await user.click(screen.getByRole("button", { name: /sign up/i }));

    expect(
      await screen.findByText("Password must contain at least one number")
    ).toBeInTheDocument();

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it("change password visibility", async () => {
    const user = userEvent.setup();
    renderComponent();

    const passwordInput = screen.getByPlaceholderText(
      "Enter password"
    ) as HTMLInputElement;
    const passwordIcon = screen.getByTestId("password-icon");

    expect(passwordInput.type).toBe("password");

    await user.clear(passwordInput);
    await user.type(passwordInput, "password899");
    expect(passwordInput.value).toBe("password899");

    await user.click(passwordIcon);
    expect(passwordInput.type).toBe("text");
    expect(screen.getAllByTestId("eye-open-icon")).toHaveLength(1);
    expect(screen.getByTestId("eye-close-icon")).toBeInTheDocument();
    await user.click(passwordIcon);
    expect(passwordInput.type).toBe("password");
    expect(screen.getAllByTestId("eye-open-icon")).toHaveLength(2);
  });

  it("navigate to sign up page", async () => {
    const user = userEvent.setup();
    renderComponent();
    const navLink = screen.getByText("Sign in");

    await user.click(navLink);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toBeCalledWith("/signin");
  });
});
