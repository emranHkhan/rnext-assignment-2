const FilterIcon = () => {
    return (
        <button type="button"
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            id="menu-button" aria-expanded="true" aria-haspopup="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-sort-descending">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 6l9 0" />
                <path d="M4 12l7 0" />
                <path d="M4 18l7 0" />
                <path d="M15 15l3 3l3 -3" />
                <path d="M18 6l0 12" />
            </svg>
        </button>
    )
}

export default FilterIcon