/* eslint-disable react/prop-types */
let nextId = 0

const TransactionForm = ({ handleToggle, isIncomeTabSelected, incomeData, expenseData, setIncomeData, setExpenseData, transactionData, setTransactionData, isEditing, setIsEditing, incomeSource, expenseSector }) => {

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTransaction = {
            id: transactionData.id || nextId++,
            category: transactionData.category,
            amount: parseFloat(transactionData.amount),
            date: transactionData.date,
        };

        const updateData = (data, setData) => {
            if (isEditing) {
                const updatedData = data.map(item => (item.id === transactionData.id ? { ...item, ...newTransaction } : item));
                setData(updatedData);
            } else {
                setData(prevData => [...prevData, newTransaction]);
            }
        };

        if (isIncomeTabSelected) {
            updateData(incomeData, setIncomeData);
        } else {
            updateData(expenseData, setExpenseData);
        }

        setTransactionData({ id: '', category: '', amount: '', date: '' });
        setIsEditing(false);
    };


    return (
        <form onSubmit={handleSubmit}>
            <div
                onClick={handleToggle}
                className="flex divide-x divide-slate-400/20 overflow-hidden rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 mt-6"
            >
                <div
                    className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 ${isIncomeTabSelected ? 'active' : ''
                        }`}
                >
                    Income
                </div>
                <div
                    className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 ${isIncomeTabSelected ? '' : 'active'
                        }`}
                >
                    Expense
                </div>
            </div>

            <div className="mt-3">
                <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                    Category
                </label>
                <div className="mt-2">
                    <select
                        required
                        id="category"
                        name="category"
                        value={transactionData.category}
                        onChange={(e) => setTransactionData(prev => ({ ...prev, category: e.target.value }))}
                        autoComplete="category-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                    >
                        {isIncomeTabSelected ? (
                            <>
                                <option value="">Select Category</option>
                                {
                                    incomeSource.map(income => <option key={income} value={income}>{income}</option>)
                                }
                            </>
                        ) : (
                            <>
                                <option value="">Select Category</option>
                                {
                                    expenseSector.map(expense => <option key={expense} value={expense}>{expense}</option>)
                                }
                            </>
                        )}
                    </select>
                </div>
            </div>

            <div className="mt-3">
                <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                    Amount
                </label>
                <div className="mt-2">
                    <input
                        required
                        type="number"
                        name="amount"
                        id="amount"
                        value={transactionData.amount}
                        onChange={(e) => setTransactionData(prev => ({ ...prev, amount: e.target.value }))}
                        autoComplete="off"
                        placeholder="12931"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div className="mt-3">
                <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
                    Date
                </label>
                <div className="mt-2">
                    <input
                        required
                        type="date"
                        name="date"
                        id="date"
                        value={transactionData.date}
                        onChange={(e) => setTransactionData(prev => ({ ...prev, date: e.target.value }))}
                        autoComplete="off"
                        placeholder="12931"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <button
                type="submit"
                className="mt-6 rounded-md bg-teal-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 w-full"
            >
                {isEditing ? 'Update' : 'Save'}
            </button>
        </form >
    );
};

export default TransactionForm;


