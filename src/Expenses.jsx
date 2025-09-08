import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { ExpensesContext } from './App'
import { Scene } from 'three'

const Expenses = () => {
  const [amount, setAmount] = useState("")
  const [detail, setDetail] = useState("")
  const [select, setSelect] = useState("")

  // Step 4: Use useContext to get data from App.jsx
  const { expenses, setExpenses } = useContext(ExpensesContext)

  const addExpense = () => {
    if (!amount || !detail || !select) {
      alert("Please enter amount and either detail or select a category");
      return;
    }

    // Step 5: Create new expense object
    const newExpense = {
      sNo: expenses.length + 1,
      date: new Date().toLocaleDateString(),
      amount,
      detail,
      select
    }
    //JavaScript
    //tpircSavaJ
    //TPIRCSAV



    // Step 6: Add to expenses array
    setExpenses([...expenses, newExpense])

    // Clear form
    setAmount("")
    setDetail("")
    setSelect("")
  }

  return (
    <div>
      <div className='w-full h-screen flex justify-center items-center z-10 relative'>
        <div className='w-[35vw] min-h-[45vh] bg-white bg-opacity-70 shadow-md p-4'>
          <h1 className='text-4xl text-center'>Add Expenses</h1>
          <div>
            <div className='amount-input'>
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-4 block p-2 border border-gray-300 rounded"
              />
            </div>
            <div className='flex gap-3'>
              <input
                type="text"
                placeholder="Expenses Detail"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                className="mt-4 block w-full p-2 border border-gray-300 rounded"
              />
              <select
                value={select}
                onChange={(e) => setSelect(e.target.value)}
                className="mt-4 block w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select</option>
                <option value="fuel">Fuel</option>
                <option value="hotel">Hotel Bill</option>
                <option value="services">Services</option>
                <option value="other">Other Expenses</option>
              </select>
            </div>
            <div className='flex gap-3'>
              <button
                onClick={addExpense}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
              >
                Add Expense
              </button>
              <Link
                to="/Statements"
                className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer flex items-center justify-center"
              >
                View Expenses
              </Link>
            </div>
          </div>

          <div id='detail-handler' className=''>
            <table className="min-w-full border border-gray-300 rounded shadow-md mt-6">
              <thead className="bg-gray-100">
                <tr className="text-gray-800">
                  <th className="px-4 py-2 border border-gray-400">S.No</th>
                  <th className="px-4 py-2 border border-gray-400">Date</th>
                  <th className="px-4 py-2 border border-gray-400">Detail</th>
                  <th className="px-4 py-2 border border-gray-400">Category</th>
                  <th className="px-4 py-2 border border-gray-400">Amount</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((exp) => (
                  <tr key={exp} className="text-center">
                    <td className="px-4 py-2 border border-gray-400">{exp.sNo}</td>
                    <td className="px-4 py-2 border border-gray-400">{exp.date}</td>
                    <td className="px-4 py-2 border border-gray-400">{exp.detail} </td>
                    <td className="px-4 py-2 border border-gray-400">{exp.select} </td>
                    <td className="px-4 py-2 border border-gray-400">{exp.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Expenses