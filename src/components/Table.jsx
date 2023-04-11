import "./Table.css"
import axios from "axios"
import React, { useEffect } from "react"
  
  const Table = ({setSelectedId,setStep}) => {
    const [workflowData, setWorkflowData] = React.useState([])

    useEffect(()=>{
        const fetchworkFlow=async()=>{
            const {data} = await axios.get("https://64307b10d4518cfb0e50e555.mockapi.io/workflow")
            setWorkflowData(data)
        }
        fetchworkFlow()
    },[])

    const handleClick=(id)=>{
        console.log(id)
        setSelectedId(id)
        setStep(1)
    }

    return (
      <div className="container">
        <h1 className="title">Workflow Table</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Input type </th>
              <th>Created at</th>
            </tr>
          </thead>
          <tbody>
            {workflowData.map(({ id, name, input_type, createdAt }) => (
              <tr key={id}>
                <td>
                  <button
                    style={{textDecoration:"underline",cursor:"pointer"}}
                    onClick={()=>handleClick(id)}
                  >{name}</button>
                </td>
                <td>
                  <div
                   >{input_type}</div>
                </td>
                <td>
                  <div
                   >{createdAt.slice(0,10)}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  export default Table