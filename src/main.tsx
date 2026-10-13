
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Error boundary for catching render errors
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '2rem', 
          fontFamily: 'system-ui, sans-serif',
          maxWidth: '800px',
          margin: '2rem auto',
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{ color: '#dc2626', marginBottom: '1rem' }}>⚠️ Application Error</h1>
          <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
            Something went wrong while loading the application.
          </p>
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', color: '#6366f1', marginBottom: '0.5rem' }}>
              Error Details
            </summary>
            <pre style={{ 
              background: '#f3f4f6', 
              padding: '1rem', 
              borderRadius: '0.5rem',
              overflow: 'auto',
              fontSize: '12px'
            }}>
              {this.state.error?.toString()}
              {this.state.error?.stack}
            </pre>
          </details>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1.5rem',
              background: '#6366f1',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Global error handlers
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
} catch (error) {
  console.error('Failed to render app:', error);
  rootElement.innerHTML = `
    <div style="padding: 2rem; font-family: system-ui, sans-serif; max-width: 800px; margin: 2rem auto;">
      <h1 style="color: #dc2626;">Failed to load application</h1>
      <p style="color: #6b7280;">An error occurred while initializing the React application.</p>
      <pre style="background: #f3f4f6; padding: 1rem; border-radius: 0.5rem; overflow: auto; font-size: 12px;">
        ${error instanceof Error ? error.toString() : String(error)}
        ${error instanceof Error ? error.stack : ''}
      </pre>
      <button onclick="window.location.reload()" style="margin-top: 1rem; padding: 0.75rem 1.5rem; background: #6366f1; color: white; border: none; border-radius: 0.5rem; cursor: pointer;">
        Reload Page
      </button>
    </div>
  `;
}
