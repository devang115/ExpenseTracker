import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Expense } from '../types';
import { format, parseISO, startOfMonth, endOfMonth, eachMonthOfInterval } from 'date-fns';

interface DataVisualizationProps {
  expenses: Expense[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const DataVisualization: React.FC<DataVisualizationProps> = ({ expenses }) => {
  const monthlyData = React.useMemo(() => {
    const monthlyTotals = new Map<string, number>();
    
    expenses.forEach(expense => {
      const month = format(parseISO(expense.date), 'yyyy-MM');
      const currentTotal = monthlyTotals.get(month) || 0;
      monthlyTotals.set(month, currentTotal + expense.amount);
    });

    const sortedMonths = Array.from(monthlyTotals.keys()).sort();
    return sortedMonths.map(month => ({
      month: format(parseISO(month), 'MMM yyyy'),
      total: monthlyTotals.get(month) || 0,
    }));
  }, [expenses]);

  const categoryData = React.useMemo(() => {
    const categoryTotals = new Map<string, number>();
    let totalExpenses = 0;
    
    expenses.forEach(expense => {
      const currentTotal = categoryTotals.get(expense.category) || 0;
      categoryTotals.set(expense.category, currentTotal + expense.amount);
      totalExpenses += expense.amount;
    });

    return Array.from(categoryTotals.entries()).map(([category, total]) => ({
      category,
      total,
      percentage: ((total / totalExpenses) * 100).toFixed(2)
    }));
  }, [expenses]);

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${categoryData[index].category} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Monthly Expenses</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Expense Categories</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="total"
              label={CustomLabel}
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DataVisualization;