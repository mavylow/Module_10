import "./Button.css";

interface ButtonProps {
  description: string;
}

export default function Button({ description }: ButtonProps) {
  return <button className="default-button">{description}</button>;
}
