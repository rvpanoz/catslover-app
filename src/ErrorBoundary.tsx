import React, { Component, ErrorInfo } from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error: ", error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-2 text-white">
          <h1>Oups! Something went wrong..</h1>
          <p className="text-sm font-medium">
            Hint: create the .env file in the root directory. Check README for
            details.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
