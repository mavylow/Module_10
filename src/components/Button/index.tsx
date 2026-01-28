import "./style.css";

interface ButtonProps {
  description: string;
  onButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "submit" | "reset" | "button" | undefined;
}

export default function Button({
  description,
  onButtonClick = () => {},
  type = "button",
}: ButtonProps) {
  return (
    <button
      className="default-button"
      onClick={(e) => onButtonClick(e)}
      type={type}
    >
      {description}
    </button>
  );
}
