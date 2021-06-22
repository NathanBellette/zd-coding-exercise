import React, { Component, ErrorInfo, ReactNode } from "react";
import styles from './ErrorBoundary.module.scss';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <section className={styles.error}>
                    <h1>Oops! There seems to have been an error!</h1>
                </section>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
