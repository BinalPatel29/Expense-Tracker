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

const searchInput = document.getElementById('history-search');

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

    const currentDateTime = new Date().toLocaleString([], { 
        dateStyle: 'short', 
        timeStyle: 'short' 
    });

    history.push({ name, amount, date: currentDateTime });
    saveState();
    clearForm();
    updateUI();
    
    itemNameInput.focus();
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
    const currentSearch = searchInput.value.toLowerCase();
    
    const filtered = history.map((item, originalIndex) => ({ ...item, originalIndex }))
                           .filter(item => item.name.toLowerCase().includes(currentSearch));
    
    if(filtered[index]) {
        const actualIndex = filtered[index].originalIndex;
        history = history.filter((_, i) => i !== actualIndex);
        saveState();
        updateUI();
    }
}

function renderSummary() {
    totalExpenses = history.reduce((sum, expense) => sum + expense.amount, 0);
    const remainingBalance = totalIncome - totalExpenses;

    totalIncomeEl.textContent = `$${totalIncome.toFixed(2)}`;
    totalExpensesEl.textContent = `$${totalExpenses.toFixed(2)}`;
    remainingBalanceEl.textContent = `$${remainingBalance.toFixed(2)}`;

    const balanceCard = document.querySelector('.summary-card.balance');

    if (remainingBalance < 0) {
        balanceCard.classList.add('negative-bg');
        balanceWarningEl.classList.remove('hidden');
    } else {
        balanceCard.classList.remove('negative-bg');
        balanceWarningEl.classList.add('hidden');
    }
}

function renderExpenses() {
    expenseListEl.innerHTML = '';
    
    const currentSearch = searchInput.value.toLowerCase();
    
    const filteredHistory = history.filter(item => {
        return item.name.toLowerCase().includes(currentSearch);
    });

    if (filteredHistory.length === 0) {
        expenseListEl.innerHTML = currentSearch 
            ? '<p class="empty-state">--- No matching expenses found ---</p>'
            : '<p class="empty-state">--- No expenses added yet ---</p>';
        return;
    }

    filteredHistory.forEach((item, index) => {
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
    
    const currentSearch = searchInput.value.toLowerCase();
    const filteredHistory = history.filter(item => item.name.toLowerCase().includes(currentSearch));

    if (filteredHistory.length === 0) {
        historyListEl.innerHTML = '<li class="empty-state">No history yet.</li>';
        return;
    }

    filteredHistory.forEach((item) => {
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

    searchInput.addEventListener('input', () => {
        updateUI();
    });

    const handleKeyboardSubmit = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addExpense();
        }
    };
    itemNameInput.addEventListener('keydown', handleKeyboardSubmit);
    itemAmountInput.addEventListener('keydown', handleKeyboardSubmit);

    incomeInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !saveIncomeBtn.disabled) {
            event.preventDefault();
            saveIncomeBtn.click();
        }
    });
}

function init() {
    bindEvents();
    updateUI();
}

window.deleteItem = deleteItem;

init();
