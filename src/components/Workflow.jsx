import React, { useState,useEffect, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from 'reactflow';
import axios from 'axios';
import 'reactflow/dist/style.css';

import Sidebar from './Sidebar';

import './Workflow.css';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'input' },
    position: { x: 25, y: 25 },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const Workflow = ({setStep,selectedId}) => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [workflow,setWorkflow]=useState(null)
  

  useEffect(()=>{
    const fetchselectedModule=async()=>{
    const {data}= await axios.get(`https://64307b10d4518cfb0e50e555.mockapi.io/workflow/${selectedId}`)
    setWorkflow(data)
    }
    fetchselectedModule()
},[])

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type}`},
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <div style={{width:"100%",height:"100vh"}}>
        <div><h1>Workflow name : {workflow?.name}</h1></div>
    <div className="dndflow">
      <ReactFlowProvider>
      <Sidebar selectedId={selectedId}/>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
    </div>
  );
};

export default Workflow;
