# Expense Tracker - Frontend Development (React)

## Project Description
This project is a **feature-rich expense tracker** built using **React**. It allows users to track, filter, and analyze their expenses with a clean and interactive UI. The main features include:

- Adding new expense entries with input validation.
- Viewing and managing expenses in a sortable, filterable, and paginated list.
- Detailed visual charts showing expense statistics and monthly comparisons.
- Responsive design with a focus on financial management UI/UX best practices.

## Features

### 1. **Expense Form**
   - **Fields**: 
     - Amount (numeric input)
     - Description (text)
     - Date (valid date picker)
     - Category (dropdown, auto-suggestions based on previous entries)
     - Payment Method (cash/credit)
   - **Form Validation**: 
     - Ensure that amount is a valid number.
     - Validate the date format.
     - Check for mandatory fields.
   - **UX Enhancement**:
     - Auto-suggestions for categories to enhance user experience based on prior entries.

### 2. **Expense List**
   - **Dynamic Table**: 
     - Display all expense entries in a dynamic table.
     - Allow sorting by amount, date, or category.
   - **Pagination**: 
     - Implement pagination to efficiently manage large sets of expense data.
   - **Inline Editing**: 
     - Enable users to edit expenses directly from the list without navigating away from the page.

### 3. **Filters & Search**
   - **Filters**: 
     - Filter expenses by category, date range, or payment method (cash/credit).
   - **Search Bar**: 
     - A search bar for users to quickly find specific expenses.

### 4. **Graphs/Charts**
   - **Monthly Comparisons**: 
     - Visualize expenses over time using a **line chart** for monthly comparisons.
   - **Category Breakdown**: 
     - Use a **pie chart** to show a category breakdown of expenses.
   - **Dynamic Filtering**:
     - Charts can be filtered to show data based on selected months or specific categories.

### 5. **State Management**
   - **Global State Management**: 
     - Use the **React Context API** to manage global state across the application.
   - **Complex Filtering**: 
     - Implement a robust filtering system that interacts with both the expense list and the charts, ensuring real-time updates and synchronization.

### 6. **Styling**
   - **CSS-in-JS**: 
     - Use **Styled Components** for modular and maintainable design patterns.
   - **Responsive Design**: 
     - Ensure the application is fully responsive, with particular attention to charts and tables across different screen sizes.

## UI Reference
For design inspiration, refer to advanced **financial management apps** (e.g., personal finance trackers) to create a clean, intuitive user interface that enhances usability.

---

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone <https://github.com/devang115/ExpenseTracker>
   cd expense-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the app in the browser:
   ```bash
   http://localhost:3000
   ```

## Technologies Used
- **React** for building the UI.
- **Styled Components** for component-level styling.
- **React Context API** for state management.
- **Chart.js** or **Recharts** for data visualization.

## Future Enhancements
- Implement user authentication for personalized expense tracking.
- Add a budgeting feature to set limits for each category.
- Enable export of expense data as CSV or PDF.
