import React from 'react';
import styled from 'styled-components';
import { User, Phone, MapPin, Calendar } from 'lucide-react';

// Unified input component that handles all field types
const UnifiedInput = ({ 
  type = "text", 
  name, 
  value, 
  onChange, 
  required = false, 
  label,
  icon: IconComponent,
  min,
  isTextarea = false
}) => {
  return (
    <StyledWrapper>
      <div className="inputGroup">
        {isTextarea ? (
          <textarea 
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder=" "
            autoComplete="off"
            rows="3"
          />
        ) : (
          <input 
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder=" "
            required={required}
            autoComplete="off"
            min={min}
          />
        )}
        <label htmlFor={name}>
          {IconComponent && <IconComponent size={16} className="icon" />}
          {label}
        </label>
      </div>
    </StyledWrapper>
  );
};

// Export as different names for convenience
export const StyledInput = (props) => <UnifiedInput {...props} />;
export const StyledTextarea = (props) => <UnifiedInput {...props} isTextarea={true} />;

const StyledWrapper = styled.div`
  .inputGroup {
    font-family: 'Segoe UI', sans-serif;
    margin: 1em 0 1em 0;
    width: 100%;
    position: relative;
  }

  .inputGroup input,
  .inputGroup textarea {
    font-size: 0.95rem;
    padding: 0.8em 1em;
    outline: none !important;
    border: 2px solid #e0e0e0 !important;
    background-color: transparent !important;
    border-radius: 20px;
    width: 100%;
    transition: all 0.3s ease;
    color: #333;
    box-shadow: none !important;
  }

  .inputGroup textarea {
    resize: vertical;
    min-height: 80px;
    font-family: inherit;
  }

  .inputGroup label {
    font-size: 0.9rem;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    padding: 0 0.5em;
    margin-left: 1em;
    pointer-events: none;
    transition: all 0.3s ease;
    color: #666;
    display: flex;
    align-items: center;
    gap: 0.5em;
    background-color: transparent;
  }

  .inputGroup label .icon {
    color: #B22222;
  }

  .inputGroup :is(input:focus, input:valid, textarea:focus, textarea:valid) ~ label,
  .inputGroup :is(input:not(:placeholder-shown), textarea:not(:placeholder-shown)) ~ label {
    top: 0;
    transform: translateY(-50%) scale(0.85);
    margin-left: 1.3em;
    padding: 0.2em 0.6em;
    background-color: white;
    border-radius: 8px;
    color: #B22222;
    font-weight: 500;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .inputGroup :is(input:focus, textarea:focus) {
    border: 2px solid #B22222 !important;
    box-shadow: 0 0 0 3px rgba(178, 34, 34, 0.1) !important;
    transform: scale(1.02);
  }

  /* Special styling for date inputs */
  .inputGroup input[type="date"] {
    color-scheme: light;
  }

  .inputGroup input[type="date"]::-webkit-calendar-picker-indicator {
    color: #B22222;
    cursor: pointer;
  }
`;