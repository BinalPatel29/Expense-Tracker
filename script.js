let totalIncome = parseFloat(localStorage.getItem('expenseTrackerIncome'));
if (isNaN(totalIncome)) {
    totalIncome = 0;
}
let totalExpenses = 0;
let history = JSON.parse(localStorage.getItem('expenseTrackerHistory') || '[]');
 
const addBtn = document.getElementById('addExpenseBtn');
const historyToggle = document.getElementById('historyToggle');
const historyPanel = document.getElementById('historyPanel');
const incomeSetup = document.getElementById('incomeSetup');
const incomeInput = document.getElementById('incomeInput');
const saveIncomeBtn = document.getElementById('saveIncomeBtn');
const itemNameInput = document.getElementById('itemName');
const itemAmountInput = document.getElementById('itemAmount');

function hasIncome() {
    return !isNaN(totalIncome) && totalIncome > 0;
}

function setFormEnabled(enabled) {
    itemNameInput.disabled = !enabled;
    itemAmountInput.disabled = !enabled;
    addBtn.disabled = !enabled;
}

function updateIncomeSetup() {
    if (hasIncome()) {
        incomeSetup.classList.add('hidden');
        setFormEnabled(true);
    } else {
        incomeSetup.classList.remove('hidden');
        setFormEnabled(false);
    }
}

addBtn.addEventListener('click', () => {
    const name = itemNameInput.value.trim();
    const amount = parseFloat(itemAmountInput.value);
 
    if (!name || isNaN(amount) || amount <= 0) return;
 
    history.push({ name, amount, date: new Date().toLocaleDateString() });
    saveState();
 
    updateUI();
    itemNameInput.value = '';
    itemAmountInput.value = '';
});

incomeInput.addEventListener('input', () => {
    const value = parseFloat(incomeInput.value);
    saveIncomeBtn.disabled = isNaN(value) || value <= 0;
});

saveIncomeBtn.addEventListener('click', () => {
    const value = parseFloat(incomeInput.value);
    if (isNaN(value) || value <= 0) return;

    totalIncome = value;
    saveState();
    updateIncomeSetup();
    updateUI();
    incomeInput.value = '';
});
 
historyToggle.addEventListener('click', () => {
    historyPanel.style.display = historyPanel.style.display === 'none' ? 'block' : 'none';
});

function saveState() {
    localStorage.setItem('expenseTrackerHistory', JSON.stringify(history));
    localStorage.setItem('expenseTrackerIncome', totalIncome);
}

window.deleteItem = function(index) {
    history = history.filter((_, i) => i !== index);
    saveState();
    updateUI();
}

function updateUI() {
    totalExpenses = history.reduce((sum, item) => sum + item.amount, 0);

    const balance = totalIncome - totalExpenses;
    const balanceEl = document.getElementById('remainingBalance');
    const warningEl = document.getElementById('balanceWarning');

    document.getElementById('totalIncome').textContent = `$${totalIncome.toFixed(2)}`;
    document.getElementById('totalExpenses').textContent = `$${totalExpenses.toFixed(2)}`;
    balanceEl.textContent = `$${balance.toFixed(2)}`;

    if (balance < 0) {
        balanceEl.classList.add('negative');
        warningEl.classList.remove('hidden');
    } else {
        balanceEl.classList.remove('negative');
        warningEl.classList.add('hidden');
    }

    updateIncomeSetup();
 
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

        const nameSpan = document.createElement('span');
        nameSpan.className = 'exp-name';
        nameSpan.textContent = item.name;

        const amountWrapper = document.createElement('div');
        const amountSpan = document.createElement('span');
        amountSpan.className = 'exp-amount';
        amountSpan.style.marginRight = '10px';
        amountSpan.textContent = `-$${item.amount.toFixed(2)}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.onclick = () => deleteItem(i);
        deleteBtn.style.background = 'none';
        deleteBtn.style.border = 'none';
        deleteBtn.style.color = 'red';
        deleteBtn.style.fontWeight = 'bold';
        deleteBtn.style.cursor = 'pointer';
        deleteBtn.textContent = 'X';

        amountWrapper.appendChild(amountSpan);
        amountWrapper.appendChild(deleteBtn);
        div.appendChild(nameSpan);
        div.appendChild(amountWrapper);
        list.appendChild(div);
 
        const li = document.createElement('li');
        li.textContent = `${item.date} — ${item.name}: $${item.amount.toFixed(2)}`;
        histList.appendChild(li);
    });
}
updateIncomeSetup();updateUI();