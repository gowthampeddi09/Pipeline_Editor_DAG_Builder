import React from 'react';
import './App.css';
import PipelineEditor from './components/PipelineEditor';
import { ReactFlowProvider } from 'reactflow';

function App() {
  return (
    <ReactFlowProvider>
      <PipelineEditor />
    </ReactFlowProvider>
  );
}

export default App;


