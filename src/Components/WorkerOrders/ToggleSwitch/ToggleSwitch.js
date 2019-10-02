import React, { Component } from 'react';

import './ToggleSwitch.css';

class ToggleSwitch extends Component {
    constructor() {
        super();
        this.state = {
            
        }
    }
    
    componentDidMount() {
        
    }

    render() {
        
        return (
            <p>Earliest first 
                <label className="switch">
                    <input type="checkbox" onClick={this.props.handleToggle}/>
                    <span className="slider round"></span>
                </label> 
                Latest first
            </p>
        );
    }
}

export default ToggleSwitch;