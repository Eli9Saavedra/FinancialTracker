import { Component, type ReactNode } from 'react'

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    message: string;
}

/**
 * extends Component - means it inherits React's component behaviour
 * <Props, State> - tells it which interfaces to use for props and state 
 */
class ErrorBoundary extends Component<Props, State> {
    /**
     * state - the built-in React class property that holds the component state
     * :State - typed against our interface
     * hasError: false - no error when the app first loads
     * message = "" - empty message to start
     */
    state: State = { hasError: false, message: "" };

    /**
     * static - belongs to the class itself, not an instance
     * getDerivedStateFromError - React calls this automatically on crash
     * error: Error - the error that was thrown
     * returns new state - set hasError: true and captures the error message
     * @param error
     * @returns
     */
    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, message: error.message };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div role="alert" style={{padding: '2rem', color: 'red'} }>
                    <h2>Something went wrong</h2>
                    <p>{this.state.message}</p>
                </div>
            );
        }

        return this.props.children;
    }
}


export default ErrorBoundary;

