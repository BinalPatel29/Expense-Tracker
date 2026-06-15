let totalIncome = parseFloat(localStorage.getItem('expenseTrackerIncome'));
if (isNaN(totalIncome)) {
    totalIncome = parseFloat(prompt("Enter your total monthly income:")) || 0;
    localStorage.setItem('expenseTrackerIncome', totalIncome);
}
let totalExpenses = 0;
let history = JSON.parse(localStorage.getItem('expenseTrackerHistory') || '[]');
 
const addBtn = document.getElementById('addExpenseBtn');
const historyToggle = document.getElementById('historyToggle');
const historyPanel = document.getElementById('historyPanel');
