import Button from ".";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

const MockMailIcon = () => <svg data-testid="mail-icon" />;

const handleClick = vi.fn();

describe("Button", () => {
  const description = "Default button";
  it("render default button with text", () => {
    render(
      <Button
        type="button"
        description="Default button"
        onButtonClick={handleClick}
      />
    );
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("render default button with icon", () => {
    const { container } = render(
      <Button type="button" Icon={MockMailIcon} onButtonClick={handleClick} />
    );
    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });
});
