"# Expense-Tracker" 

-A simple and responsive Personal Expense Tracker built using HTML, CSS, and JavaScript. This application helps users track expenses, view spending history, and monitor their remaining monthly balance.

# Features:
-Enter your monthly income when opening the app for the first time.
-Add expenses with a name and amount.
-Automatically calculate:
  Total Income
  Total Expenses
  Remaining Balance
-View recent expense history.
-Delete expenses when needed.
-Data is saved using browser Local Storage, so it remains available after refreshing the page.
-Responsive and clean user interface.

# Technologies Used
  HTML5
  CSS3
  JavaScript (Vanilla JS)
-Browser Local Storage
-Project Structure
-Expense Tracker/
│
├── index.html      # Main webpage
├── style.css       # Styling and layout
├── script.js       # Application logic
└── README.md       # Project documentation

# How to Run the Project:
-Method 1: Open Directly in Browser
Download or clone the project.
Open the project folder.
Double-click index.html.

-Method 2: Run Using VS Code
Open the project folder in VS Code.
Install the Live Server extension.
Right-click index.html.
Click Open with Live Server.
The application will open automatically in your browser.

# How to Use:
-Open the application.
-Enter your monthly income when prompted.
-Enter:
Expense Name
Expense Amount
-Click Add Expense.
-View updated totals and remaining balance.
-Click Recent History to view expense history.
-Click the X button next to an expense to delete it.
-Data Storage

-This project uses the browser's Local Storage:

-expenseTrackerIncome → Stores monthly income
-expenseTrackerHistory → Stores expense history

=Because of Local Storage, data remains available even after refreshing the page.