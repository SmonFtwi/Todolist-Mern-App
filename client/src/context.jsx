import { useState, createContext } from "react";

export const TodoContext = createContext(null);

export const TodoContextProvider = (probs) =>{
  const authState = useState({});

  return (
    <TodoContext.Provider value={authState}>
        {probs.children}
    </TodoContext.Provider>
  )

}