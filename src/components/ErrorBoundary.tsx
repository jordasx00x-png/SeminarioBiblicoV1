import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error capturado en ErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FDFCFB] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 bg-[#7F1D1D] text-white rounded-2xl flex items-center justify-center text-3xl font-bold mb-4 shadow-lg">
            📖
          </div>
          <h1 className="text-2xl font-bold text-[#1A2533] mb-2 font-serif">
            Seminario Teológico Digital
          </h1>
          <p className="text-gray-600 max-w-md mb-6 text-sm font-sans">
            Hubo un detalle temporal al cargar la vista. Haz clic en el botón para recargar la aplicación.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            className="px-6 py-2.5 bg-[#1A2533] text-[#E0D7C6] rounded-xl font-medium text-sm hover:bg-[#2A3A4D] transition-all shadow-sm cursor-pointer"
          >
            Recargar Aplicación
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
