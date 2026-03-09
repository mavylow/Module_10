import type { ReactNode } from "react";
import { Frame } from "./index.styled";

interface FrameWrapperProps {
  children: ReactNode;
}

export default function FrameWrapper({ children }: FrameWrapperProps) {
  return <Frame className="frame">{children}</Frame>;
}
