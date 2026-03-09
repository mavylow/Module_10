import type { ComponentType } from "react";
import "./style.css";

interface InputMessageProps {
  message: string;
  status: "success" | "warning" | "error";
  Icon: ComponentType;
}

function InputMessage({ message, status, Icon }: InputMessageProps) {
  return (
    <div className={`input-message ${status}`} id={`username-${status}`}>
      <Icon />
      <p className={`${status}-text`}>{message}</p>
    </div>
  );
}

export default InputMessage;
