import type { ChangeEvent, ComponentType } from "react";
import "./style.css";

interface TextareaProps {
  id: string;
  description: string;
  name: string;
  placeholder: string;
  Icon: ComponentType;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

function Textarea({
  id,
  description,
  name,
  placeholder,
  Icon,
  value,
  onChange,
}: TextareaProps) {
  return (
    <div className="input-wrapper">
      <label htmlFor={id} className="default-label">
        <Icon />
        {description}
      </label>

      <textarea
        data-testid="textarea"
        className="default-textarea"
        id={id}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default Textarea;
