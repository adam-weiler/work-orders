import React from 'react';
import './SearchBox.css';

const SearchBox = ({ onSearchChange }) => {
    return (
        <input type="search" name="workerFilter" placeholder="Filter by worker name..." onChange={onSearchChange}></input>
    );
}

export default SearchBox;