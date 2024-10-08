import React from 'react';
import { useExpenseContext } from '../context/ExpenseContext';

interface FilterAndSearchProps {
  filterOptions: {
    category: string;
    startDate: string;
    endDate: string;
    paymentMethod: string;
    searchTerm: string;
  };
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterAndSearchProps['filterOptions']>>;
}

const FilterAndSearch: React.FC<FilterAndSearchProps> = ({ filterOptions, setFilterOptions }) => {
  const { expenses } = useExpenseContext();
  
  const categories = Array.from(new Set(expenses.map(e => e.category)));
  const paymentMethods = Array.from(new Set(expenses.map(e => e.paymentMethod)));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilterOptions(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Filter and Search</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <input
          type="text"
          name="searchTerm"
          value={filterOptions.searchTerm}
          onChange={handleInputChange}
          placeholder="Search expenses..."
          className="p-2 border rounded"
        />
        <select
          name="category"
          value={filterOptions.category}
          onChange={handleInputChange}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
        <select
          name="paymentMethod"
          value={filterOptions.paymentMethod}
          onChange={handleInputChange}
          className="p-2 border rounded"
        >
          <option value="">All Payment Methods</option>
          {paymentMethods.map((method, index) => (
            <option key={index} value={method}>{method}</option>
          ))}
        </select>
        <input
          type="date"
          name="startDate"
          value={filterOptions.startDate}
          onChange={handleInputChange}
          className="p-2 border rounded"
        />
        <input
          type="date"
          name="endDate"
          value={filterOptions.endDate}
          onChange={handleInputChange}
          className="p-2 border rounded"
        />
      </div>
    </div>
  );
};

export default FilterAndSearch;