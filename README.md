**"💳 Personal Expense Tracker"**

-A premium, highly responsive Personal Expense Tracker built with native web technologies. It allows users to manage monthly budgets, search transactions in real time, view historical trends, and export records safely across browser sessions.

# Features:
* Income Management: Quick-action inline editing to modify monthly income anytime without resetting your logs.
* Instant Logging: Easily add item names and costs using the mouse or the `Enter` key.
* Auto-Calculations: Real-time summary dashboard updates for Total Income, Expenses, and Remaining Balance.
* Smart UI Alerts: Balance card switches to red and a warning banner displays instantly if expenses exceed income.
* Live Search Filter: Dynamic, high-performance input row filters past transactions on-the-fly as you type.
* Timestamp Sync: Transactions are automatically stamped with localized dates and precise times.
* Local Persistence: Uses browser storage to safely keep all financial records after reloads or tab exits.
* Log Exporting: Native file download module lets you export your full transaction history to your device.

# Technologies Used
* Languages: HTML5, CSS3, JavaScript (Vanilla JS)
* Storage: Browser Web Storage (`localStorage`, `Blob` API)

Expense-Tracker/
├── index.html      # Structure & markup
├── style.css       # Layout & styling
├── script.js       # App logic & handlers
└── README.md       # Project documentation

# How to Run the Project:
Method 1: Open Directly in Browser
1. Download or clone this project folder.
2. Navigate into the root folder directory.
3. Double-click index.html to run the app.

Method 2: Run via VS Code (Recommended)
1. Open the project folder in VS Code.
2. Install the Live Server extension.
3. Right-click index.html and choose "Open with Live Server".

# How to Use:
1. Set Income: Enter your initial monthly income to unlock the form. Click Edit Income at any time to update it.
2. Add Expense: Type the name and amount, then click + Add Expense (or just press Enter).
3. Monitor Balance: Watch your dashboard update instantly. If you overspend, the balance card turns red and a warning appears.
4. Search Records: Type keywords into the top search bar to filter your transaction rows instantly as you type.
5. Toggle Panels: Use the View Logs / Close (X) button to show or collapse your comprehensive history log view.
6. Export Data: Click the ↓ Export button to instantly save a backup text file of your budget to your computer.
7. Delete Items: Click the red X next to any item row to permanently remove it and re-calculate your dashboard balances.

# Data storage:
The application saves data natively inside your browser's Local Storage:
* expenseTrackerIncome: Stores your numerical monthly baseline income value.
* expenseTrackerHistory: Stores the main structural array of transaction records (`name`, `amount`, `date`).