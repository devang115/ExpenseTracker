import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { ExpenseProvider, useExpenseContext } from './context/ExpenseContext';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import FilterAndSearch from './components/FilterAndSearch';
import DataVisualization from './components/DataVisualization';
import Statistics from './components/Statistics';
import { Expense } from './types';

const AppContent: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { expenses, addExpense } = useExpenseContext();
  const [filterOptions, setFilterOptions] = useState({
    category: '',
    startDate: '',
    endDate: '',
    paymentMethod: '',
    searchTerm: '',
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleAddExpense = (expense: Expense) => {
    addExpense(expense);
  };

  const filteredExpenses = expenses.filter(expense => {
    const searchTermLower = filterOptions.searchTerm.toLowerCase();
    return (
      (!filterOptions.category || expense.category === filterOptions.category) &&
      (!filterOptions.startDate || new Date(expense.date) >= new Date(filterOptions.startDate)) &&
      (!filterOptions.endDate || new Date(expense.date) <= new Date(filterOptions.endDate)) &&
      (!filterOptions.paymentMethod || expense.paymentMethod.toLowerCase() === filterOptions.paymentMethod.toLowerCase()) &&
      (!filterOptions.searchTerm || 
        expense.description.toLowerCase().includes(searchTermLower) ||
        expense.category.toLowerCase().includes(searchTermLower) ||
        expense.paymentMethod.toLowerCase().includes(searchTermLower))
    );
  });

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Expense Tracker</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <FilterAndSearch filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
            <ExpenseList expenses={filteredExpenses} />
          </div>
          <div>
            <ExpenseForm onSubmit={handleAddExpense} />
          </div>
        </div>
        <div className="mt-12">
          <DataVisualization expenses={filteredExpenses} />
        </div>
        <div className="mt-12">
          <Statistics expenses={filteredExpenses} />
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ExpenseProvider>
      <AppContent />
    </ExpenseProvider>
  );
};

export default App;