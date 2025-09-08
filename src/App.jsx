import React, { createContext, useState } from 'react'
import Expenses from './Expenses'
import Statements from './Statements'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Scene from './Scene'

// Step 1: Create a simple context
export const ExpensesContext = createContext()

const App = () => {
  // Step 2: Create state for expenses in main App
  const [expenses, setExpenses] = useState([])

  return (
    // Step 3: Wrap everything with Context Provider and pass the data
    //expenses and setExpenses as props which will be accessible in any child component
    <>
     <Scene />
    <ExpensesContext.Provider value={{ expenses, setExpenses }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Expenses />} />
          <Route path='/Statements' element={<Statements />} />
        </Routes>
      </BrowserRouter>
    </ExpensesContext.Provider>
    </>
  )
}

export default App