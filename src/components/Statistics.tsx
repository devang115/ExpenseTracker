import React from 'react';
import { Expense } from '../types';

interface StatisticsProps {
  expenses: Expense[];
}

const Statistics: React.FC<StatisticsProps> = ({ expenses }) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const totalCurrentMonth = expenses
    .filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    })
    .reduce((total, expense) => total + (typeof expense.amount === 'number' ? expense.amount : 0), 0);

  const categoryBreakdown = expenses.reduce((acc, expense) => {
    const amount = typeof expense.amount === 'number' ? expense.amount : 0;
    acc[expense.category] = (acc[expense.category] || 0) + amount;
    return acc;
  }, {} as Record<string, number>);

  const sortedCategories = Object.entries(categoryBreakdown).sort((a, b) => b[1] - a[1]);

  const calculateTrend = () => {
    const lastMonth = new Date(currentYear, currentMonth - 1);
    const lastMonthTotal = expenses
      .filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === lastMonth.getMonth() && expenseDate.getFullYear() === lastMonth.getFullYear();
      })
      .reduce((total, expense) => total + (typeof expense.amount === 'number' ? expense.amount : 0), 0);

    if (lastMonthTotal === 0) return '0.00';
    const trend = ((totalCurrentMonth - lastMonthTotal) / lastMonthTotal) * 100;
    return trend.toFixed(2);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Total Expenses This Month</h3>
          <p className="text-3xl font-bold">${totalCurrentMonth.toFixed(2)}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Spending Trend</h3>
          <p className="text-3xl font-bold">{calculateTrend()}%</p>
          <p className="text-sm text-gray-500">compared to last month</p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Category Breakdown</h3>
        <ul>
          {sortedCategories.map(([category, amount]) => (
            <li key={category} className="flex justify-between items-center mb-2">
              <span>{category}</span>
              <span className="font-medium">${amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Statistics;