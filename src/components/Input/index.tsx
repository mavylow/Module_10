import { type ChangeEvent, type ComponentType } from "react";
import "./style.css";

export interface InputProps {
  id: string;
  description: string;
  name: string;
  placeholder: string;
  type: string;
  Icon: ComponentType;
  value: string;
  onInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  id,
  description,
  name,
  placeholder,
  type,
  Icon,
  value,
  onInput,
}: InputProps) {
  return (
    <>
      <label htmlFor={id} className="default-label">
        <Icon />
        {description}
      </label>
      <input
        className="default-input"
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => onInput(e)}
      />
    </>
  );
}
