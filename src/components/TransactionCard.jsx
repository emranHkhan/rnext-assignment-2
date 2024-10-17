/* eslint-disable react/prop-types */
import { useState } from "react";
import FilterIcon from "./FilterIcon";
import FilterIconTwo from "./FilterIconTwo";
import IncomeIcon from "./IncomeIcon";
import ExpenseIcon from "./ExpenseIcon";
import TransactionListItem from "./TransactionListItem";

const TransactionCard = ({
    sourceData,
    transactionData,
    transactionType,
    handleListItemClick,
    handleAscendingSort,
    handleDescendingSort,
    selectedCategory,
    setSelectedCategory,
}) => {
    const [showSortOptions, setShowSortOptions] = useState(false);
    const [showCategoryCheckbox, setShowCategoryCheckbox] = useState(false);

    // show the sorting options popup and hide the category options popup
    const handleShowSorting = () => {
        setShowSortOptions((prev) => !prev);
        setShowCategoryCheckbox(false);
    };

    // show the category options popup and hide the sort options popup
    const handleShowCheckbox = () => {
        setShowCategoryCheckbox((prev) => !prev);
        setShowSortOptions(false);
    };

    // handling the filtering of transactions based on categories
    const handleChange = (e) => {
        const { value, checked } = e.target;
        setSelectedCategory((prev) =>
            checked ? [...prev, value] : prev.filter((category) => category !== value)
        );
    };

    // show filtered data based on the selected category
    const filteredData = selectedCategory.length > 0
        ? transactionData.filter((item) => selectedCategory.includes(item.category))
        : transactionData;

    return (
        <div className="border rounded-md relative">
            <div className="flex items-center justify-between gap-2 bg-[#F9FAFB] py-4 px-4 rounded-md">
                <div className="flex items-center gap-2">
                    {transactionType === "income" ? <IncomeIcon /> : <ExpenseIcon />}
                    <div>
                        <h3 className="text-xl font-semibold leading-7 text-gray-800 capitalize">{transactionType}</h3>
                    </div>
                </div>
                <div>
                    <div className="relative inline-block text-left">
                        <div onClick={handleShowSorting}>
                            <FilterIcon />
                        </div>
                        <div
                            className={`${showSortOptions ? 'block' : 'hidden'} absolute z-10 mt-2 left-5 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                            role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                            <div className="py-1" role="none">
                                <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all cursor-pointer"
                                    role="menuitem" tabIndex="-1" id="menu-item-0" onClick={() => {
                                        handleAscendingSort(transactionType)
                                        setShowSortOptions(false)
                                    }}>Low to High</span>
                                <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all cursor-pointer"
                                    role="menuitem" tabIndex="-1" id="menu-item-0" onClick={() => {
                                        handleDescendingSort(transactionType)
                                        setShowSortOptions(false)
                                    }}>High to Low</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative inline-block text-left">
                        <div onClick={handleShowCheckbox}>
                            <FilterIconTwo />
                        </div>
                        <div
                            className={`${showCategoryCheckbox ? 'block' : 'hidden'} absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                            role="menu" aria-orientation="vertical" aria-labelledby="filter-button" tabIndex="-1"
                            id="filter-dropdown">
                            <div className="py-1" role="none">
                                {
                                    sourceData.map((src) => {
                                        return (
                                            <label key={src} className="inline-flex items-center px-4 py-2 text-sm text-gray-700">
                                                <input type="checkbox" className="form-checkbox h-4 w-4 rounded-md text-gray-600"
                                                    id="filter-option-2" value={src} onChange={handleChange} />
                                                <span className="ml-2 capitalize">{src}</span>
                                            </label>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-4 divide-y">
                {
                    filteredData.map((item) =>
                        transactionType === "income" ? (
                            <TransactionListItem key={item.id} transaction={item} handleListItemClick={handleListItemClick} type="income" />
                        ) : (
                            <TransactionListItem key={item.id} transaction={item} handleListItemClick={handleListItemClick} type="expense" />
                        )
                    )
                }
            </div>
        </div>
    );
};

export default TransactionCard;
