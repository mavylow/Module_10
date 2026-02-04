import "./style.css";

interface ActionButtonProps {
  description: string;
  onButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type: "reset" | "button";
}

interface SubmitButtonProps {
  description: string;
  type: "submit";
  disabled?: boolean;
}

type ButtonProps = ActionButtonProps | SubmitButtonProps;

function Button(props: ButtonProps) {
  const { description, type } = props;

  if (type === "submit") {
    return (
      <button className="default-button" type={type} disabled={props.disabled}>
        {description}
      </button>
    );
  } else {
    return (
      <button
        className="default-button"
        onClick={props.onButtonClick}
        type={props.type}
      >
        {description}
      </button>
    );
  }
}

export default Button;
