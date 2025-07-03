import React from 'react';

function ControlPanel({ onAddNode, onAutoLayout }) {
  return (
    <div className="control-panel">
      <button className="btn btn-primary" onClick={onAddNode}>
        Add Node
      </button>
      <button className="btn btn-secondary" onClick={onAutoLayout}>
        Auto Layout
      </button>
    </div>
  );
}

export default ControlPanel;
