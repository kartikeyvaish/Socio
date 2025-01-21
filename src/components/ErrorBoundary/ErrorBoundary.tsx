// Packages Imports
import { Component, ReactNode } from 'react';

// Local Imports
import ErrorBoundaryFallback from '../../layouts/ErrorBoundaryFallback';

export type ErrorBoundayProps = {
  children: Exclude<NonNullable<ReactNode>, string | number | boolean>;
  fallback: ReactNode;
  onError?: (error: Error, stackTrace: string) => void;
};

type StateProps = { error: Error | null };

// This component is a Class Component instead of Default Functional component
// As the `componentDidCatch` support was not there for functional component
// at the time of writing this component.
class ErrorBoundary extends Component<ErrorBoundayProps, StateProps> {
  state: StateProps = { error: null };

  static defaultProps = {
    fallback: <ErrorBoundaryFallback />
  };

  static getDerivedStateFromError(error: Error): StateProps {
    return { error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    if (typeof this.props.onError === 'function') {
      this.props.onError(error, info.componentStack);
    }
  }

  resetError: () => void = () => {
    this.setState({ error: null });
  };

  render() {
    const { fallback } = this.props;

    return this.state.error ? fallback : this.props.children;
  }
}

export default ErrorBoundary;
