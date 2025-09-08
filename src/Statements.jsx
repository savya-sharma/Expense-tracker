import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ExpensesContext } from './App'

const categoryOptions = [
  { value: '', label: 'All Categories' },
  { value: 'fuel', label: 'Fuel' },
  { value: 'hotel', label: 'Hotel Bill' },
  { value: 'services', label: 'Services' },
  { value: 'other', label: 'Other Expenses' },
]

const Statements = () => {
  // Step 7: Get expenses data using useContext
  const { expenses } = useContext(ExpensesContext)
  const [categoryFilter, setCategoryFilter] = useState('')

  const filteredExpenses = categoryFilter
    ? expenses.filter(exp => exp.select === categoryFilter)
    : expenses

  return (
    <div className='w-full min-h-screen flex justify-center items-start pt-8 relative z-10'>
      <div className='w-[80vw] bg-white bg-opacity-70 shadow-md p-6'>

        <h2 className='text-3xl text-center mb-6'>View All Expenses</h2>

        <Link
          to="/"
          className="mb-4 inline-block px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          ← Back to Add Expenses
        </Link>

        <div className="mb-6 flex items-center gap-4">
          <label htmlFor="category-filter" className="font-medium">
            Filter by Category:
          </label>
          <select
            id="category-filter"
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            {categoryOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {filteredExpenses.length === 0 ? (
          <div className='text-center py-8'>
            <p className='text-gray-600 text-lg'>
              {expenses.length === 0
                ? 'No expenses added yet. Go back and add some expenses!'
                : 'No expenses found for the selected category.'}
            </p>
          </div>
        ) : (
          <table className="min-w-full border border-gray-300 rounded shadow-md">
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
              {filteredExpenses.map((expense) => (
                <tr key={expense.sNo} className="text-center">
                  <td className="px-4 py-2 border border-gray-400">{expense.sNo}</td>
                  <td className="px-4 py-2 border border-gray-400">{expense.date}</td>
                  <td className="px-4 py-2 border border-gray-400">{expense.detail}</td>
                  <td className="px-4 py-2 border border-gray-400">{expense.select}</td>
                  <td className="px-4 py-2 border border-gray-400">₹{expense.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default Statements