# 💳 Personal Expense Tracker

A premium, highly responsive personal finance utility built using native web technologies. This application empowers users to seamlessly manage monthly budgets, search transactions in real time, monitor live balance fluctuations, and safely export data backups across browser sessions.

---

## 🔥 Features

*   **💼 Income Management:** Quick-action inline editing tool to adjust your baseline monthly income on-the-fly without corrupting recorded logs.
*   **⚡ Instant Logging:** Rapid entry execution allows you to log item descriptions and costs via UI mouse clicks or pressing the `Enter` key.
*   **📊 Auto-Calculations:** A real-time summary dashboard dynamically aggregates and displays **Total Income**, **Expenses**, and **Remaining Balance**.
*   **🚨 Smart UI Alerts:** The remaining balance card instantly shifts to a red warning state alongside a banner notice if expenses exceed your set income.
*   **🔍 Live Search Filter:** High-performance input filter sorts your comprehensive transaction ledger instantaneously as you type.
*   **⏱️ Timestamp Sync:** Every financial event is automatically appended with localized dates and precise, real-time timestamps.
*   **💾 Local Data Persistence:** Safely preserves your entire ledger between browser reloads or tab closures without reliance on an external database.
*   **📥 Log Exporting:** A native file compile routine downloads your complete transaction history to your device locally as a text file asset.

---

## 📁 Project Architecture

The workspace contains a modular, lightweight file configuration:

```text
Expense-Tracker/
├── index.html      # Document structure & structural markup
├── style.css       # Visual layout, design token mapping, & styling
├── script.js       # Core application logic & state managers
└── README.md       # Project documentation and guide
```

---

## 🛠️ Technologies Used

*   **Core Languages:** HTML5, CSS3, Vanilla JavaScript (ES6+)
*   **Native Web Core APIs:** Browser Web Storage (`localStorage`), JavaScript File Interface (`Blob` API)

---

## 🚀 How to Run the Project

You can run this project locally on your machine using one of the two methods below:

### Method 1: Open Directly in Browser
1. Download or clone this project repository to your machine.
2. Navigate into the root folder directory (`Expense-Tracker/`).
3. Double-click **`index.html`** to execute the script environment inside your default browser.

### Method 2: Run via VS Code (Recommended)
1. Open the project workspace folder in **VS Code**.
2. Install the **Live Server** extension if you do not have it yet.
3. Right-click **`index.html`** and select **"Open with Live Server"**.

---

## 💻 How to Use

1.  **Set Baseline Income:** Input your monthly revenue parameters to unlock data logging fields. Click **"Edit Income"** at any time to revise baseline bounds.
2.  **Log a New Transaction:** Type in an item name and its cost, then click **"+ Add Expense"** (or hit the `Enter` key).
3.  **Track Financial Status:** Evaluate dashboard balance changes. If you overspend, the indicator panel shifts red and reveals safety warnings.
4.  **Query Past Entries:** Utilize the localized search field to filter your historical rows instantly as you input strings.
5.  **Toggle Views:** Click the **"View Logs"** or **"Close (X)"** element to collapse or view your full transaction history ledger.
6.  **Backup Financial Files:** Tap the **"↓ Export"** button to compile and download a physical tracking backup directly to your host machine.
7.  **Purge Line Items:** Click the red **"X"** marker adjacent to individual item listings to remove specific records and force a system-wide recalculation.

---

## 💾 Storage Blueprint

This application maintains user data inside your local browser instance via **Local Storage** keys:
*   `expenseTrackerIncome`: Tracks and records your fixed monthly numerical baseline asset value.
*   `expenseTrackerHistory`: Manages a structured collection array containing transaction schema nodes (`name`, `amount`, `date`).