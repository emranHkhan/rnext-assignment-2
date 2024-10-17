/* eslint-disable react/prop-types */
import DeleteIcon from "./DeleteIcon";
import EditIcon from "./EditIcon";

const TransactionListItem = ({ transaction, handleListItemClick, type }) => {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    }

    return (
        <div className="flex justify-between items-center py-2 relative group cursor-pointer" onClick={(e) => handleListItemClick(e, transaction.id, type)}>
            <div>
                <h3 className="text-base font-medium leading-7 text-gray-600 capitalize">{transaction.category}</h3>
                <p className="text-xs text-gray-600">{formatDate(transaction.date)}</p>
            </div>
            <div className="flex items-center gap-2">
                <p className="text-base font-semibold text-gray-600 transition-all group-hover:-translate-x-14">
                    BDT {transaction.amount}
                </p>

                <div
                    className="translate-x-5 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 absolute right-0 top-1/2 -translate-y-1/2 transition-all">
                    <button className="hover:text-teal-600" role="button" title="Edit Button" data-action="edit">
                        <EditIcon />
                    </button>

                    <button className="hover:text-red-600" role="button" title="Delete" data-action="delete">
                        <DeleteIcon />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TransactionListItem;
