import React, { useState } from "react";

const SearchUsers = ({onSearch}) => {
    const [searchText, setSearchText] = useState("");

    const Search = (e) =>{
        setSearchText(e.target.value);
        onSearch(e.target.value);
    }

    return (
        <div>
            <div className="d-flex my-3">
                <input 
                    className="form-control" 
                    type="text" 
                    placeholder="Search user" 
                    value={searchText}
                    onChange={(e) => Search(e)}
                />
                <button className="btn btn-success m-0" type="submit">Search</button>
            </div>
        </div>
    )
}

export default SearchUsers;