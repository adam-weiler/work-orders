import React, { Component } from 'react';

import axios from 'axios';  // Used for API requests.
import Moment from 'react-moment';  // Used to convert timestamp to date.

import './WorkOrder.css';

class WorkOrder extends Component {
    constructor() {
        super();
        this.state = {
            queryResults: []
        }
    }

    




    render() {

        let jsonData = this.props.jsonData;
    
    
    Moment.globalFormat = 'D/MM/YYYY, h:MM:SS A';

    return (
        <article className='work-order'>
            <h2>{jsonData.name}</h2>
            <p>{jsonData.description}</p>
            <span className='profile-image'></span>
            <p>(worder_id name)</p>
            <p><Moment unix>{jsonData.deadline}</Moment></p>
        </article>
    );
}
}

export default WorkOrder;