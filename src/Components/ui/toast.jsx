import React, { createContext, useContext, useState, useCallback } from 'react';
import { Alert } from './alert';
import { CheckCircle, X, AlertTriangle, Info, AlertCircle } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const toastIcons = {
  success: <CheckCircle className="text-emerald-500" size={16} strokeWidth={2} />,
  error: <AlertCircle className="text-red-500" size={16} strokeWidth={2} />,
  warning: <AlertTriangle className="text-amber-500" size={16} strokeWidth={2} />,
  info: <Info className="text-blue-500" size={16} strokeWidth={2} />,
};

const Toast = ({ toast, onRemove }) => {
  return (
    <div
      className={`
        fixed top-4 right-4 z-[100] transition-all duration-300 ease-in-out transform
        ${toast.visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
      style={{ 
        transform: `translateY(${toast.index * 80}px) ${toast.visible ? 'translateX(0)' : 'translateX(100%)'}`
      }}
    >
      <Alert
        variant={toast.variant}
        size="sm"
        isNotification={true}
        icon={toastIcons[toast.variant]}
        action={
          <button
            onClick={() => onRemove(toast.id)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={16} />
          </button>
        }
        className="shadow-lg border bg-white min-w-[320px] max-w-[400px]"
      >
        <div className="flex flex-col space-y-1">
          {toast.title && (
            <p className="text-sm font-medium text-gray-900">{toast.title}</p>
          )}
          {toast.description && (
            <p className="text-sm text-gray-600">{toast.description}</p>
          )}
        </div>
      </Alert>
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ title, description, variant = 'success', duration = 3000 }) => {
    const id = Date.now() + Math.random();
    const toast = {
      id,
      title,
      description,
      variant,
      visible: false,
      index: toasts.length,
    };

    setToasts(prev => [...prev, toast]);

    // Show animation
    setTimeout(() => {
      setToasts(prev => 
        prev.map(t => 
          t.id === id ? { ...t, visible: true } : t
        )
      );
    }, 50);

    // Auto remove
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, [toasts.length]);

  const removeToast = useCallback((id) => {
    setToasts(prev => 
      prev.map(toast => 
        toast.id === id ? { ...toast, visible: false } : toast
      )
    );

    // Remove from DOM after animation
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 300);
  }, []);

  const toast = {
    success: ({ title, description, duration }) => 
      addToast({ title, description, variant: 'success', duration }),
    error: ({ title, description, duration }) => 
      addToast({ title, description, variant: 'error', duration }),
    warning: ({ title, description, duration }) => 
      addToast({ title, description, variant: 'warning', duration }),
    info: ({ title, description, duration }) => 
      addToast({ title, description, variant: 'info', duration }),
  };

  // Update indices for stacking
  const toastsWithIndices = toasts.map((toast, index) => ({
    ...toast,
    index: toasts.length - 1 - index,
  }));

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      <div className="fixed top-0 right-0 z-[100] pointer-events-none">
        {toastsWithIndices.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast toast={toast} onRemove={removeToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};