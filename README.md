# Pipeline Editor (DAG Builder)

A professional React-based Pipeline Editor for creating and managing Directed Acyclic Graphs (DAGs). This application simulates real-time data pipelines or processing workflows using interconnected nodes.

---

## 🚀 Features

- **Visual Node Creation**: Add nodes with custom labels through an intuitive modal interface  
- **Interactive Edge Drawing**: Connect nodes with drag-and-drop functionality  
- **Directional Arrows**: Clear visual indicators showing edge directionality  
- **Real-time DAG Validation**: Instant validation feedback for graph structure  
- **Auto Layout**: Intelligent graph arrangement using Dagre algorithm  
- **Node/Edge Deletion**: Select and delete elements using keyboard shortcuts  
- **Professional UI**: Modern, responsive design with smooth animations  
- **Zoom & Pan**: Full navigation controls with minimap  
- **Mobile Responsive**: Works seamlessly across different screen sizes  

---

## 📋 Requirements Fulfilled

### Core Requirements
- ✅ React Application Setup with proper component structure  
- ✅ Add Node Functionality with custom modal dialog  
- ✅ Draw Edges with clear directionality (arrows)  
- ✅ Delete Nodes/Edges with delete key  
- ✅ Real-time DAG Validation Status  
- ✅ Auto Layout functionality  

### Pipeline Validity Rules
- ✅ Minimum 2 nodes requirement  
- ✅ Cycle detection algorithm  
- ✅ Node connectivity validation  
- ✅ Proper edge direction enforcement  
- ✅ Self-loop prevention  

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
git clone https://github.com/yourusername/pipeline-editor.git
cd pipeline-editor
npm install
npm start
```

Open your browser and navigate to `http://localhost:3000`

### Production Build

```bash
npm run build
```

---

## 📁 Project Structure

```
pipeline-editor/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ControlPanel.js
│   │   ├── CustomNode.js
│   │   ├── NodeModal.js
│   │   └── PipelineEditor.js
│   ├── utils/
│   │   ├── dagValidation.js
│   │   └── autoLayout.js
│   ├── styles/
│   │   └── PipelineEditor.css
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

---

## 📚 Libraries Used & Architectural Decisions

### Key Libraries

- **React Flow**  
  For building interactive node-based UIs with ease and performance.

- **Dagre**  
  Used for auto-layouts of DAGs in a top-down or left-right structure.

- **React Hooks**  
  - `useState`, `useEffect`, `useCallback`, `useMemo` used for managing state and optimizing performance.

### Architectural Decisions

- Modular components: clean separation of logic  
- React hooks: concise state handling  
- CSS modules: scoped styles for better maintainability  
- Custom node and modal components  

---

## 🎯 Usage Guide

### Adding Nodes
- Click "Add Node"
- Provide label
- Confirm to add node to canvas

### Connecting Nodes
- Drag from the right handle of one node
- Drop onto the left handle of another node

### Deleting Elements
- Select node/edge and press `Delete` or `Backspace`

### Auto Layout
- Click "Auto Layout"
- Graph reflows using Dagre algorithm

### Validation
- Shown in real-time at the bottom
- Shows success/failure messages with reasoning

---

## 🚀 Deployment

### Vercel

```bash
npm install -g vercel
npm run build
vercel
```

Or follow deployment steps via Netlify/GitHub Pages.

---

## 🔧 Technical Challenges & Solutions

### 1. `useReactFlow` Outside Context
**Solution**:
```js
const [instance, setInstance] = useState(null);
<ReactFlow onInit={setInstance} />
```

### 2. NodeTypes Re-creation Warning
**Solution**:
```js
const nodeTypes = { customNode: CustomNode }; // define outside component
```

### 3. Edge Direction Arrow
**Solution**:
```js
markerEnd: {
  type: MarkerType.ArrowClosed,
  width: 20,
  height: 20,
  color: '#3b82f6',
}
```

### 4. Cycle Detection
**Solution**: DFS with recursion stack:
```js
function hasCycle(nodeId) {
  if (recStack.has(nodeId)) return true;
  visited.add(nodeId); recStack.add(nodeId);
  // check neighbors
  recStack.delete(nodeId);
}
```

### 5. Modal + Canvas Conflicts
**Solution**:
```js
<div onMouseDown={(e) => e.stopPropagation()} />
```

---

## 📊 Performance Optimizations

- `React.memo` and `useMemo` for memoization  
- `useCallback` for stable handlers  
- Efficient DAG validation via debounce or dependency array  

---

## 🧪 Testing Strategy

### Manual Checklist
- [ ] Node creation
- [ ] Valid/Invalid edge connection
- [ ] Cycle detection
- [ ] Layout trigger
- [ ] Node/edge deletion
- [ ] Mobile responsiveness
