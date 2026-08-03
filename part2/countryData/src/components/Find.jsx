const Find = ({filter, handleFilterChange}) => {
    return (
        <div>
            <p>Find countries
                <input type="text" placeholder="Enter country name..." value={filter} onChange={handleFilterChange} />
            </p>
        </div>
    )
}

export default Find;