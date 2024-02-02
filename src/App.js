import './App.css';
import { useReducer, useState, useRef, useLayoutEffect, createContext } from 'react';
import { useEffect } from 'react';
import UseContextUseing from './components/useContextUseing';
// using useReducer 1step
const initialState = { count: 0, userData: [] }

// using useReducer 2ndstep actions
const ACTIONS = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
  FETCH: "fetch"
}

// using useReducer 3rd step reducer
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return { ...state, count: state.count + 1 }
    case ACTIONS.DECREMENT:
      return { ...state, count: state.count - 1 }
    case ACTIONS.FETCH:
      return { ...state, userData: action.payload }
    case "clear":
      return initialState
    default:
      return state
  }
}

// 1st step for using useContext : creating context and using the this values to all children compoents. 
export const ContentData = createContext();

function App() {
  // using useReducer 4th step declaration 
  const [state, dispatch] = useReducer(reducer, initialState)

  const reftab = useRef()
  const handleIncrement = () => {
    // using useReducer 5th step using dispath
    dispatch({
      type: ACTIONS.INCREMENT
    })
  }
  const handleDecrement = () => {
    dispatch({
      type: ACTIONS.DECREMENT
    })
  }

  const [data, setData] = useState() // useState used for State declaration & setting the newState also.

  const handleFetch = () => {
    // basic javascript fetch call
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json().then(response => setData(response))) // response.json written promises so using .then(res=>setData(res))
  }
  useEffect(() => {
    if (data)
      dispatch({
        type: ACTIONS.FETCH,
        payload: data
      })
  }, [data]) // data is dependency of useEffect, it means when data us change useEffect will execute 

  const handleClear = () => {
    dispatch({
      type: "clear",
    })
  }

  useLayoutEffect(() => {
    reftab.current.style.background = "black"
    reftab.current.style.color = "white"
  }, [state.count]) // useLayoutEffect is similer to useEffect, but it is execute before useEffect.


  return (
    // using useReducer 6th step using state
    // 2nd step for using useContext :contextName.Provider and value can use all the children.
    <ContentData.Provider value={state}> 
      <UseContextUseing
        handleClear={handleClear}
        handleDecrement={handleDecrement}
        handleFetch={handleFetch}
        handleIncrement={handleIncrement}
        reftab={reftab}
      />

    </ContentData.Provider>
  );
}

export default App;
