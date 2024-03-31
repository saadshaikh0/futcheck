import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="h-[100vh] w-full flex flex-col justify-center items-center">
          <div className="text-white font-bold">
            Oops! Something went wrong.
          </div>
          <a className="text-white bg-fuchsia-400 rounded px-2 mt-3" href="/">
            <button>Go Home</button>
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
