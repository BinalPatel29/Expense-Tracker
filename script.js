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

function updateUI() {
    totalExpenses = history.reduce((sum, item) => sum + item.amount, 0);

    const balance = totalIncome - totalExpenses;
    document.getElementById('totalIncome').textContent = `$${totalIncome.toFixed(2)}`;
    document.getElementById('totalExpenses').textContent = `$${totalExpenses.toFixed(2)}`;
    document.getElementById('remainingBalance').textContent = `$${balance.toFixed(2)}`;
 
    const list = document.getElementById('expenseList');
    const histList = document.getElementById('historyList');
 
    list.innerHTML = '';
    histList.innerHTML = '';
 
    if (history.length === 0) {
        list.innerHTML = '<p class="empty-state">--- No expenses added yet ---</p>';
        histList.innerHTML = '<li class="empty-state">No history yet.</li>';
        return;
    }
 
    history.forEach((item, i) => {
        const div = document.createElement('div');
        div.className = 'expense-item';
        div.style.display = 'flex';
        div.style.justifyContent = 'space-between';
        div.style.alignItems = 'center';
        div.innerHTML = `
            <span class="exp-name">${item.name}</span>
            <div>
                <span class="exp-amount" style="margin-right:10px;">-$${item.amount.toFixed(2)}</span>
                <button onclick="deleteItem(${i})" style="background:none; border:none; color:red; font-weight:bold; cursor:pointer;">X</button>
            </div>
        `;
        list.appendChild(div);
 
        const li = document.createElement('li');
        li.textContent = `${item.date} — ${item.name}: $${item.amount.toFixed(2)}`;
        histList.appendChild(li);
    });
}

updateUI();