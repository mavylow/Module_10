import Fallback from "@pages/Fallback";
import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.log(info, ":", error);
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    } else {
      return <Fallback />;
    }
  }
}

export default ErrorBoundary;
