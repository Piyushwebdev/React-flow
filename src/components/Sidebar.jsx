import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default ({selectedId}) => {
    const [page,setPage]=useState(1)
    const [modules,setModules]=useState([])
    const fecthModules=async()=>{
        const {data}= await axios.get(`https://64307b10d4518cfb0e50e555.mockapi.io/modules?page=${page}&limit=5`)
        setModules(data)
    }
    useEffect(()=>{
        fecthModules()
    },[page])

  const onDragStart = (event, module) => {
    event.dataTransfer.setData('application/reactflow', module?.name);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">
        <h1>Modules</h1>
      </div>
      {modules.map((module)=>{
        return ( <div className="dndnode" style={{height:"48px",display:"flex",justifyContent:"center",paddingInline:"1rem"}} onDragStart={(event) => onDragStart(event, module)} draggable>
            {module?.name}
        </div>)
      })
     }
     <div style={{display:"flex",justifyContent:"space-around",marginTop:"2rem"}}>
     <button style={{border:"1px solid grey",paddingBlock:"5px",paddingInline:"8px",cursor:"pointer"}} onClick={()=>setPage(1)}>1</button>
     <button style={{border:"1px solid grey",paddingBlock:"5px",paddingInline:"8px",cursor:"pointer"}} onClick={()=>setPage(2)}>2</button>
     <button style={{border:"1px solid grey",paddingBlock:"5px",paddingInline:"8px",cursor:"pointer"}} onClick={()=>setPage(3)}>3</button>
     <button style={{border:"1px solid grey",paddingBlock:"5px",paddingInline:"8px",cursor:"pointer"}} onClick={()=>setPage(4)}>4</button>
     <button style={{border:"1px solid grey",paddingBlock:"5px",paddingInline:"8px",cursor:"pointer"}} onClick={()=>setPage(5)}>5</button>
     </div>
    </aside>
  );
};