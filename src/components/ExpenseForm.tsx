import React from 'react';
import { useForm } from 'react-hook-form';
import { Expense } from '../types';
import { useExpenseContext } from '../context/ExpenseContext';

interface ExpenseFormProps {
  expense?: Expense;
  onSubmit: (data: Expense) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ expense, onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Expense>({
    defaultValues: expense || {
      id: '',
      amount: 0,
      description: '',
      date: new Date().toISOString().split('T')[0],
      category: '',
      paymentMethod: '',
    },
  });

  const { expenses } = useExpenseContext();

  const categories = Array.from(new Set(expenses.map(e => e.category)));

  const handleFormSubmit = (data: Expense) => {
    // Ensure amount is stored as a number
    const processedData = {
      ...data,
      amount: parseFloat(data.amount.toString()),
    };
    onSubmit(processedData);
    reset(); // Reset the form after submission
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          id="amount"
          step="0.01"
          {...register('amount', { 
            required: 'Amount is required', 
            min: { value: 0.01, message: 'Amount must be positive' },
            valueAsNumber: true,
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <input
          type="text"
          id="description"
          {...register('description', { required: 'Description is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          id="date"
          {...register('date', { required: 'Date is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <input
          type="text"
          id="category"
          list="categories"
          {...register('category', { required: 'Category is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <datalist id="categories">
          {categories.map((cat, index) => (
            <option key={index} value={cat} />
          ))}
        </datalist>
        {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
      </div>

      <div>
        <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">Payment Method</label>
        <select
          id="paymentMethod"
          {...register('paymentMethod', { required: 'Payment method is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select a payment method</option>
          <option value="Cash">Cash</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>
        {errors.paymentMethod && <p className="mt-1 text-sm text-red-600">{errors.paymentMethod.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {expense ? 'Update Expense' : 'Add Expense'}
      </button>
    </form>
  );
};

export default ExpenseForm;