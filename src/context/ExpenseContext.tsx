import React, { createContext, useState, useEffect, useContext } from 'react';
import { Expense } from '../types';

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  updateExpense: (updatedExpense: Expense) => void;
  deleteExpense: (id: string) => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const storedExpenses = localStorage.getItem('expenses');
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense: Expense) => {
    setExpenses([...expenses, { ...expense, id: Date.now().toString() }]);
  };

  const updateExpense = (updatedExpense: Expense) => {
    setExpenses(expenses.map(expense => expense.id === updatedExpense.id ? updatedExpense : expense));
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, updateExpense, deleteExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpenseContext must be used within an ExpenseProvider');
  }
  return context;
};