import React from 'react';
import { useToast } from '../Components/ui/toast';

const ToastDemo = () => {
  const { toast } = useToast();

  const showSuccessToast = () => {
    toast.success({
      title: "Success!",
      description: "This is a success toast notification",
      duration: 3000
    });
  };

  const showErrorToast = () => {
    toast.error({
      title: "Error!",
      description: "Something went wrong",
      duration: 4000
    });
  };

  const showWarningToast = () => {
    toast.warning({
      title: "Warning!",
      description: "Please be careful",
      duration: 3000
    });
  };

  const showInfoToast = () => {
    toast.info({
      title: "Info",
      description: "Here's some information",
      duration: 3000
    });
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">🧪 Toast Notification Demo</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="d-grid gap-3">
            <button 
              className="btn btn-success"
              onClick={showSuccessToast}
            >
              ✅ Show Success Toast
            </button>
            
            <button 
              className="btn btn-danger"
              onClick={showErrorToast}
            >
              ❌ Show Error Toast
            </button>
            
            <button 
              className="btn btn-warning"
              onClick={showWarningToast}
            >
              ⚠️ Show Warning Toast
            </button>
            
            <button 
              className="btn btn-info"
              onClick={showInfoToast}
            >
              ℹ️ Show Info Toast
            </button>
          </div>
          
          <div className="mt-4 p-3 border rounded bg-light">
            <h5>🎯 Instructions:</h5>
            <ul className="mb-0">
              <li>Click any button above to see toast notifications</li>
              <li>Toasts appear in the top-right corner</li>
              <li>They auto-dismiss after a few seconds</li>
              <li>You can click the X button to dismiss manually</li>
              <li>Multiple toasts will stack on top of each other</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToastDemo;