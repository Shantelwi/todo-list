export default function SortBy({
    sortyBy,
    sortDirection,
    onSortByChange,
    onSortDirectionChange
}) {
    return(
        <div>
            <label htmlFor="sortBy">Sort By</label>
            <select 
                id="sortBy"
                value={sortyBy}
                onChange={(e) => onSortByChange(e.target.value)}
            >
                <option value="creationDate">Creation Date</option>
                <option value="title">Title</option>
            </select>

            <label htmlFor="sortDirection">Order</label>
            <select 
                id="sortDirection"
                value={sortDirection}
                onChange={(e) => onSortDirectionChange(e.target.value)}
            >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>

            </select>
        </div>
    );
}