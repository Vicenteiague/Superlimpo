import { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

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
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0b1120] text-white flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-[#131f37] border border-[#23375e] p-8 rounded-2xl shadow-2xl">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center border border-red-500/30">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h1 className="text-xl font-bold font-serif mb-2 text-[#f8fafc]">
              Superlimpo Produtos de Limpeza
            </h1>
            <p className="text-sm text-[#94a3b8] mb-6 leading-relaxed">
              Ocorreu uma pequena instabilidade momentânea. Clique abaixo para recarregar o cartão:
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#1A56DB] to-[#2563eb] hover:brightness-110 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#1A56DB]/30 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Recarregar Aplicativo</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
