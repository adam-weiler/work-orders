import React, { Component } from 'react';

import './SearchBox.css';

const SearchBox = ({ SearchField, searchChange }) => {
    return (
        <input type="search" name="workerFilter" placeholder="Filter by worker name..." onChange={searchChange}></input>
    );
}

export default SearchBox;