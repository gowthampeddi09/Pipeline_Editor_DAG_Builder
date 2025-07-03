import React from 'react';
import { Handle, Position } from 'reactflow';

const CustomNode = ({ data }) => {
  return (
    <div className="custom-node">
      <Handle 
        type="target" 
        position={Position.Left} 
        className="handle"
        style={{ left: -5 }}
      />
      <div className="node-content">
        {data.label}
      </div>
      <Handle 
        type="source" 
        position={Position.Right} 
        className="handle"
        style={{ right: -5 }}
      />
    </div>
  );
};

export default CustomNode;