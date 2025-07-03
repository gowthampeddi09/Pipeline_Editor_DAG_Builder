import React, { useState, useEffect } from 'react';

function NodeModal({ isOpen, onClose, onAddNode }) {
  const [name, setName] = useState('');

  useEffect(() => {
    if (isOpen) setName('');
  }, [isOpen]);

  const submit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onAddNode(name);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div 
        className="modal-content" 
        onMouseDown={(e) => e.stopPropagation()} 
        tabIndex={-1}
      >
        <div className="modal-header">
          <h3>Add New Node</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <form onSubmit={submit}>
          <div className="form-group">
            <label>Node Name:</label>
            <input 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              autoFocus 
              className="form-input"
              placeholder="Enter node name"
            />
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Node
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NodeModal;

