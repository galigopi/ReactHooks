import React, { useCallback, useState } from 'react'

const UseCallbackUsing = () => {
    const [num, setNum] = useState(0)
    const [count, setCount]=useState(0)
      
    const memocal = useCallback((num) => {
        return num * 5
    }, [])

    const handleChange = (e) => {
        console.log(e.target.value)
        setNum(e.target.value)
        setCount(memocal(e.target.value))
    }
   

    return (
        <div className="App">
            <p>user Entered {num? num :0} * 5 = {count}</p> 
            <input type='number' value={num} placeholder='number' onChange={(e)=>handleChange(e)} />
        </div>
    )
}
export default UseCallbackUsing;