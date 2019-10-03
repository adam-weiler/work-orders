import React from 'react';
import './ToggleSwitch.css';

const ToggleSwitch = ({ handleToggle }) => {
    return (
        <p>Earliest first 
            <label className="switch">
                <input type="checkbox" onClick={handleToggle}/>
                <span className="slider round"></span>
            </label> 
            Latest first
        </p>
    );
}

export default ToggleSwitch;