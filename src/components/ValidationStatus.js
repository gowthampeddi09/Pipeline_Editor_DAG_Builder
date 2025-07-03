import React from 'react';
import { FiCheckCircle, FiXCircle, FiAlertCircle } from 'react-icons/fi';

function ValidationStatus({ status }) {
  const getStatusIcon = () => {
    if (status.isValid) {
      return <FiCheckCircle className="status-icon valid" size={20} />;
    } else {
      return <FiXCircle className="status-icon invalid" size={20} />;
    }
  };

  const getStatusClass = () => {
    return `validation-status ${status.isValid ? 'valid' : 'invalid'}`;
  };

  return (
    <div className={getStatusClass()}>
      <div className="status-header">
        {getStatusIcon()}
        <h3 className="status-title">
          {status.isValid ? 'Valid DAG' : 'Invalid DAG'}
        </h3>
      </div>
      
      <div className="status-message">
        <p>{status.message}</p>
      </div>
      
      {status.details && status.details.length > 0 && (
        <div className="status-details">
          <h4>
            <FiAlertCircle size={16} />
            Issues Found:
          </h4>
          <ul>
            {status.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="validation-rules">
        <h4>DAG Requirements:</h4>
        <ul>
          <li>At least 2 nodes</li>
          <li>No circular dependencies</li>
          <li>All nodes must be connected</li>
          <li>No self-connections</li>
        </ul>
      </div>
    </div>
  );
}

export default ValidationStatus;