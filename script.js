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

addBtn.addEventListener('click', () => {
    const name = document.getElementById('itemName').value.trim();
    const amount = parseFloat(document.getElementById('itemAmount').value);
 
    if (!name || isNaN(amount) || amount <= 0) return;
 
    history.push({ name, amount, date: new Date().toLocaleDateString() });
    saveState();
 
    updateUI();
    document.getElementById('itemName').value = '';
    document.getElementById('itemAmount').value = '';
});
 
historyToggle.addEventListener('click', () => {
    historyPanel.style.display = historyPanel.style.display === 'none' ? 'block' : 'none';
});

function saveState() {
    localStorage.setItem('expenseTrackerHistory', JSON.stringify(history));
    localStorage.setItem('expenseTrackerIncome', totalIncome);
}

window.deleteItem = function(index) {
    history.splice(index, 1);
    saveState();
    updateUI();
}