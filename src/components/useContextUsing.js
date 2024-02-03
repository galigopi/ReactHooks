import React, { useContext } from 'react'
import { ContentData } from '../App' 


const UseContextUseing = ( props ) => {
  // 3rd step for using useContext : fetching the values from global component.
  const data = useContext(ContentData)

  return (
    <div>
      <div className="App">
        <div ref={props.reftab}>count : {data.count}</div>
        <button onClick={props.handleIncrement}>increment</button>
        <button onClick={props.handleDecrement}>decrement</button>
        <button onClick={props.handleFetch}>getData</button>
        <button onClick={props.handleClear}>ClearData</button>
        {data?.userData?.map((item) => (
          item.id <= 10 &&
          <table key={item.id} >
            <tbody >
              <tr>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.completed}</td>
              </tr>
            </tbody>
          </table>
        ))}

      </div>
    </div>
  )
}
export default UseContextUseing;
