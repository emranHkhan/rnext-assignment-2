import { useState } from "react"
import TransactionDashboard from "./components/TransactionDashboard"
import TransactionForm from "./components/TransactionForm"
import Navbar from "./components/Navbar"
import TransactionCard from "./components/TransactionCard"

const incomeSource = ["salary", "outsourcing", "bond", "dividend"]
const expenseSector = ["education", "food", "health", "bill", "insurance", "tax", "transport", "telephone"]

function App() {
  const [transactionData, setTransactionData] = useState({
    id: '',
    category: '',
    amount: '',
    date: '',
  })

  const [isEditing, setIsEditing] = useState(false)
  const [isIncomeTabSelected, setIsIncomeTabSelected] = useState(true)
  const [incomeData, setIncomeData] = useState([])
  const [expenseData, setExpenseData] = useState([])
  const [selectedIncomeCategory, setSelectedIncomeCategory] = useState([])
  const [selectedExpenseCategory, setSelectedExpenseCategory] = useState([])

  // toggles between income and expense tab
  const handleToggle = (e) => {
    if (e.target.textContent === 'Income') {
      setIsIncomeTabSelected(true)
    } else if (e.target.textContent === 'Expense') {
      setIsIncomeTabSelected(false)
    }

    setTransactionData({ id: '', category: '', amount: '', date: '' })
    setIsEditing(false)
  }

  // handle update and deletion of income and expense data
  const handleListItemClick = (e, id, transactionType) => {
    const action = e.target.closest('button')?.getAttribute('data-action');
    const isIncome = transactionType === 'income';

    const data = isIncome ? incomeData : expenseData;
    const setData = isIncome ? setIncomeData : setExpenseData;

    if (action === 'edit') {
      const [filteredItem] = data.filter(item => item.id === id);
      setIsIncomeTabSelected(isIncome);
      setIsEditing(true);
      setTransactionData(filteredItem);
    } else if (action === 'delete') {
      const remainedItems = data.filter(item => item.id !== id);
      setData(remainedItems);
      setTransactionData({ id: '', category: '', amount: '', date: '' });
    }
  }

  // sort transactions in ascending order by amount
  const handleAscendingSort = (transactionType) => {
    if (transactionType === 'income') {

      setIncomeData([...incomeData].sort((a, b) => a.amount - b.amount))

    } else if (transactionType === 'expense') {

      setExpenseData([...expenseData].sort((a, b) => a.amount - b.amount))
    }
  }

  // sort transactions in descending order by amount
  const handleDescendingSort = (transactionType) => {
    if (transactionType === 'income') {

      setIncomeData([...incomeData].sort((a, b) => b.amount - a.amount))

    } else if (transactionType === 'expense') {

      setExpenseData([...expenseData].sort((a, b) => b.amount - a.amount))

    }
  }

  const totalIncome = incomeData.reduce((acc, curr) => acc + curr.amount, 0)
  const totalExpense = expenseData.reduce((acc, curr) => acc + curr.amount, 0)
  const balance = totalIncome - totalExpense

  return (
    <>
      <Navbar />
      <main className="relative mx-auto mt-10 w-full max-w-7xl">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 py-8 bg-[#F9FAFB] border rounded-md">
            <h2 className="text-3xl font-semibold leading-7 text-gray-800 text-center">Expense Tracker</h2>
            <TransactionForm
              handleToggle={handleToggle}
              isIncomeTabSelected={isIncomeTabSelected}
              incomeData={incomeData}
              expenseData={expenseData}
              setIncomeData={setIncomeData}
              setExpenseData={setExpenseData}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              transactionData={transactionData}
              setTransactionData={setTransactionData}
              incomeSource={incomeSource}
              expenseSector={expenseSector}
            />
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white">
              <TransactionDashboard
                balance={balance}
                totalExpense={totalExpense}
                totalIncome={totalIncome}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
              <TransactionCard
                sourceData={incomeSource}
                transactionData={incomeData}
                transactionType="income"
                handleListItemClick={(e, id) => handleListItemClick(e, id, 'income')}
                handleAscendingSort={handleAscendingSort}
                handleDescendingSort={handleDescendingSort}
                selectedCategory={selectedIncomeCategory}
                setSelectedCategory={setSelectedIncomeCategory}
              />
              <TransactionCard
                sourceData={expenseSector}
                transactionData={expenseData}
                transactionType="expense"
                handleListItemClick={(e, id) => handleListItemClick(e, id, 'expense')}
                handleAscendingSort={handleAscendingSort}
                handleDescendingSort={handleDescendingSort}
                selectedCategory={selectedExpenseCategory}
                setSelectedCategory={setSelectedExpenseCategory}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default App



