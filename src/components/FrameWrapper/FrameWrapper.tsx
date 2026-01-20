import type { ReactNode } from "react";
import "./FrameWrapper.css";

interface FrameWrapperProps {
  children: ReactNode;
}

export default function FrameWrapper({ children }: FrameWrapperProps) {
  return <div className="frame">{children}</div>;
}
