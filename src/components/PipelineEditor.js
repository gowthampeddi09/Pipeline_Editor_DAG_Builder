import React, { useState, useCallback, useEffect, useMemo } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  MiniMap,
  Background,
  useReactFlow,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import '../styles/PipelineEditor.css';

import CustomNode from './CustomNode';
import NodeModal from './NodeModal';
import ControlPanel from './ControlPanel';
import { validateDAG } from '../utils/dagValidation';
import { getLayoutedElements } from '../utils/autoLayout';

// Define nodeTypes outside component to prevent re-creation
const nodeTypes = { customNode: CustomNode };

function PipelineEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback((params) => {
    if (params.source === params.target) return;
    setEdges((eds) =>
      addEdge(
        { 
          ...params, 
          type: 'smoothstep', 
          animated: true, 
          id: `edge-${params.source}-${params.target}`,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: '#3b82f6',
          },
          style: {
            strokeWidth: 2,
            stroke: '#3b82f6',
          },
        },
        eds
      )
    );
  }, [setEdges]);

  const addNode = useCallback((label) => {
    const id = `node-${Date.now()}`;
    setNodes((nds) => [
      ...nds,
      {
        id,
        type: 'customNode',
        position: { 
          x: Math.random() * 250, 
          y: Math.random() * 250 
        },
        data: { label },
      },
    ]);
    setIsModalOpen(false);
  }, [setNodes]);

  const onLayout = useCallback(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges);
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
    if (reactFlowInstance) {
      setTimeout(() => reactFlowInstance.fitView(), 0);
    }
  }, [nodes, edges, setNodes, setEdges, reactFlowInstance]);

  useEffect(() => {
    const handleDelete = (e) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        setNodes((nds) => nds.filter(n => !n.selected));
        const selectedNodeIds = nodes.filter(n => n.selected).map(n => n.id);
        setEdges((eds) =>
          eds.filter(
            e => !e.selected && 
                 !selectedNodeIds.includes(e.source) && 
                 !selectedNodeIds.includes(e.target)
          )
        );
      }
    };
    window.addEventListener('keydown', handleDelete);
    return () => window.removeEventListener('keydown', handleDelete);
  }, [nodes]);

  useEffect(() => {
    const { isValid, message } = validateDAG(nodes, edges);
    setValidationMessage(message);
  }, [nodes, edges]);

  return (
    <div className="pipeline-editor">
      <div className="editor-header">
        <h1>Pipeline Editor</h1>
        <ControlPanel 
          onAddNode={() => setIsModalOpen(true)} 
          onAutoLayout={onLayout} 
        />
      </div>
      
      <div className="editor-content">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onInit={setReactFlowInstance}
          fitView
          attributionPosition="bottom-left"
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      
      <div className="validation-status">
        {validationMessage && (
          <div className={`validation-message ${validationMessage.includes('Error') ? 'error' : 'success'}`}>
            {validationMessage}
          </div>
        )}
      </div>
      
      <NodeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddNode={addNode} 
      />
    </div>
  );
}

export default PipelineEditor;