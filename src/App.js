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

  const [data, setData] = useState()
  const handleFetch = () => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json().then(response => setData(response)))
  }
  useEffect(() => {
    if (data)
      dispatch({
        type: ACTIONS.FETCH,
        payload: data
      })
  }, [data])

  const handleClear = () => {
    dispatch({
      type: "clear",
    })
  }

  useLayoutEffect(() => {
    reftab.current.style.background = "black"
    reftab.current.style.color = "white"
  }, [state.count])


  return (
    // using useReducer 6th step using state
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
