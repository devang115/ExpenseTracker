import React, { useState } from 'react';
import { useExpenseContext } from '../context/ExpenseContext';
import { Expense } from '../types';

const ExpenseList: React.FC<{ expenses: Expense[] }> = ({ expenses }) => {
  const { deleteExpense, updateExpense } = useExpenseContext();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Expense | null>(null);

  const handleEdit = (expense: Expense) => {
    setEditingId(expense.id);
    setEditForm(expense);
  };

  const handleUpdate = () => {
    if (editForm) {
      updateExpense(editForm);
      setEditingId(null);
      setEditForm(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => {
      if (!prev) return null;
      return { ...prev, [name]: name === 'amount' ? parseFloat(value) || 0 : value };
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Payment Method</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {editingId === expense.id ? (
                  <input
                    type="date"
                    name="date"
                    value={editForm?.date || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                ) : (
                  expense.date
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {editingId === expense.id ? (
                  <input
                    type="text"
                    name="description"
                    value={editForm?.description || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                ) : (
                  expense.description
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {editingId === expense.id ? (
                  <input
                    type="number"
                    name="amount"
                    value={editForm?.amount || 0}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                ) : (
                  `$${typeof expense.amount === 'number' ? expense.amount.toFixed(2) : '0.00'}`
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {editingId === expense.id ? (
                  <input
                    type="text"
                    name="category"
                    value={editForm?.category || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                ) : (
                  expense.category
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {editingId === expense.id ? (
                  <input
                    type="text"
                    name="paymentMethod"
                    value={editForm?.paymentMethod || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                ) : (
                  expense.paymentMethod
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {editingId === expense.id ? (
                  <button onClick={handleUpdate} className="text-indigo-600 hover:text-indigo-900 mr-2">Save</button>
                ) : (
                  <button onClick={() => handleEdit(expense)} className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
                )}
                <button onClick={() => deleteExpense(expense.id)} className="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;