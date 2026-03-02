import React from 'react';

interface ErrorBoundaryState {
    hasError: boolean;
}

export class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    ErrorBoundaryState
> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-white flex items-center justify-center p-8">
                    <div className="border-3 border-black p-8 max-w-lg text-center shadow-hard">
                        <h1 className="font-black text-2xl uppercase mb-4">SYSTEM_ERROR</h1>
                        <p className="font-mono text-sm text-gray-600 mb-6">
                            An unexpected error occurred. Please refresh the page.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-black text-white font-mono font-bold text-sm uppercase border-3 border-black hover:bg-power transition-colors"
                        >
                            REBOOT_SYSTEM
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
