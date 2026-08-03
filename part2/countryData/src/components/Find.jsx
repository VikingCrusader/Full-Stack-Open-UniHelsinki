const Find = ({filter, handleFilterChange}) => {
    return (
        <div>
            <h1 style={{ fontSize: "26px" }}>Country Data and Weather Information of the capital city</h1>
            <p style={{ fontSize: "22px" }}>Find countries:
                <input type="text" placeholder="Enter country name..." value={filter} onChange={handleFilterChange} />
            </p>
        </div>
    )
}

export default Find;