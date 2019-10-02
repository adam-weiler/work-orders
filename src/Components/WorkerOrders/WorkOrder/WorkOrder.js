import React, { Component } from 'react';

import './WorkOrder.css';

const WorkOrder = ({ jsonData }) => {
    return (
        <article>
            <h2>{jsonData.name}</h2>
            <p>{jsonData.description}</p>
            <p>Circle</p>
            <p>(worder_id name)</p>
            <p>{jsonData.deadline}</p>
            
            id
            workerid
        </article>
    );
}



export default WorkOrder;