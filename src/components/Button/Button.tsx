import "./Button.css";

interface ButtonProps {
  description: string;
  onButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({ description, onButtonClick }: ButtonProps) {
  return (
    <button
      className="default-button"
      onClick={(e) => {
        e.preventDefault();
        onButtonClick(e);
      }}
    >
      {description}
    </button>
  );
}
