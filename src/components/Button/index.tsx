import type { ComponentType } from "react";
import "./style.css";

interface ActionButtonProps {
  description?: string;
  onButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type: "reset" | "button";
  Icon?: ComponentType;
}

interface SubmitButtonProps {
  description: string;
  type: "submit";
  disabled?: boolean;
  Icon?: ComponentType;
}

type ButtonProps = ActionButtonProps | SubmitButtonProps;

function Button(props: ButtonProps) {
  const { description, type, Icon } = props;

  if (type === "submit") {
    return (
      <button
        data-testid="submit-button"
        className="default-button"
        type={type}
        aria-label={description}
        disabled={props.disabled}
      >
        {description}
      </button>
    );
  } else {
    return (
      <button
        className={Icon ? "icon-button" : "default-button"}
        onClick={props.onButtonClick}
        type={props.type}
        aria-label={description}
        data-testid="button"
      >
        {Icon ? <Icon /> : description}
      </button>
    );
  }
}

export default Button;
