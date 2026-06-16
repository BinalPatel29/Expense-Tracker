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
const totalIncomeEl = document.getElementById('totalIncome');
const totalExpensesEl = document.getElementById('totalExpenses');
const remainingBalanceEl = document.getElementById('remainingBalance');
const balanceWarningEl = document.getElementById('balanceWarning');
const expenseListEl = document.getElementById('expenseList');
const historyListEl = document.getElementById('historyList');

function hasIncome() {
    return totalIncome > 0;
}

function setFormEnabled(enabled) {
    itemNameInput.disabled = !enabled;
    itemAmountInput.disabled = !enabled;
    addBtn.disabled = !enabled;
}

function isValidName(name) {
    return /^[A-Za-z\s]+$/.test(name);
}

function saveState() {
    localStorage.setItem('expenseTrackerHistory', JSON.stringify(history));
    localStorage.setItem('expenseTrackerIncome', totalIncome);
}

function addExpense() {
    const name = itemNameInput.value.trim();
    const amount = parseFloat(itemAmountInput.value);

    if (!name || !isValidName(name) || isNaN(amount) || amount <= 0) {
        return;
    }

    history.push({ name, amount, date: new Date().toLocaleDateString() });
    saveState();
    clearForm();
    updateUI();
}

function clearForm() {
    itemNameInput.value = '';
    itemAmountInput.value = '';
}

function updateIncome(value) {
    totalIncome = value;
    saveState();
    updateUI();
}

function deleteItem(index) {
    history = history.filter((_, i) => i !== index);
    saveState();
    updateUI();
}

function renderSummary() {
    totalExpenses = history.reduce((sum, expense) => sum + expense.amount, 0);
    const remainingBalance = totalIncome - totalExpenses;

    totalIncomeEl.textContent = `$${totalIncome.toFixed(2)}`;
    totalExpensesEl.textContent = `$${totalExpenses.toFixed(2)}`;
    remainingBalanceEl.textContent = `$${remainingBalance.toFixed(2)}`;

    if (remainingBalance < 0) {
        remainingBalanceEl.classList.add('negative');
        balanceWarningEl.classList.remove('hidden');
    } else {
        remainingBalanceEl.classList.remove('negative');
        balanceWarningEl.classList.add('hidden');
    }
}

function renderExpenses() {
    expenseListEl.innerHTML = '';

    if (history.length === 0) {
        expenseListEl.innerHTML = '<p class="empty-state">--- No expenses added yet ---</p>';
        return;
    }

    history.forEach((item, index) => {
        const expenseItem = document.createElement('div');
        expenseItem.className = 'expense-item';

        const nameSpan = document.createElement('span');
        nameSpan.className = 'exp-name';
        nameSpan.textContent = item.name;

        const amountWrapper = document.createElement('div');
        amountWrapper.className = 'amount-wrapper';

        const amountSpan = document.createElement('span');
        amountSpan.className = 'exp-amount';
        amountSpan.textContent = `-$${item.amount.toFixed(2)}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.type = 'button';
        deleteBtn.textContent = 'X';
        deleteBtn.addEventListener('click', () => deleteItem(index));

        amountWrapper.appendChild(amountSpan);
        amountWrapper.appendChild(deleteBtn);
        expenseItem.appendChild(nameSpan);
        expenseItem.appendChild(amountWrapper);
        expenseListEl.appendChild(expenseItem);
    });
}

function renderHistory() {
    historyListEl.innerHTML = '';

    if (history.length === 0) {
        historyListEl.innerHTML = '<li class="empty-state">No history yet.</li>';
        return;
    }

    history.forEach((item) => {
        const historyEntry = document.createElement('li');
        historyEntry.textContent = `${item.date} — ${item.name}: $${item.amount.toFixed(2)}`;
        historyListEl.appendChild(historyEntry);
    });
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

function updateUI() {
    updateIncomeSetup();
    renderSummary();
    renderExpenses();
    renderHistory();
}

function bindEvents() {
    addBtn.addEventListener('click', addExpense);

    incomeInput.addEventListener('input', () => {
        const value = parseFloat(incomeInput.value);
        saveIncomeBtn.disabled = isNaN(value) || value <= 0;
    });

    saveIncomeBtn.addEventListener('click', () => {
        const value = parseFloat(incomeInput.value);
        if (isNaN(value) || value <= 0) {
            return;
        }

        updateIncome(value);
        incomeInput.value = '';
    });

    historyToggle.addEventListener('click', () => {
        historyPanel.classList.toggle('hidden');
    });
}

function init() {
    bindEvents();
    updateUI();
}

window.deleteItem = deleteItem;

init();