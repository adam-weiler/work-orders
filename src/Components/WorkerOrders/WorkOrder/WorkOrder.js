import React, { Component } from 'react';

import axios from 'axios';  // Used for API requests.
import Moment from 'react-moment';  // Used to convert timestamp to date.

import './WorkOrder.css';

class WorkOrder extends Component {
    constructor() {
        super();
        this.state = {
            worker: []
        }
    }
    
    componentDidMount() {
        const self = this;

        axios.get(`https://www.hatchways.io/api/assessment/workers/${this.props.workOrders.workerId}`)
        .then(function (response) {
            self.setState({
                worker: response.data.worker
            });
        });
    }

    render() {
        let workOrders = this.props.workOrders;
        let worker = this.state.worker;    
    
        Moment.globalFormat = 'D/MM/YYYY, h:MM:SS A';

        return (
            <article className='work-order'>
                <h2>{workOrders.name}</h2>
                <p class='text-left'>{workOrders.description}</p>
                <span className='profile-info'>
                    <img src={worker.image} alt={worker.name} class='profile-image' />
                    <span className='profile-text text-left'>
                        <p>{worker.name}</p>
                        <p>{worker.companyName}</p>
                        <p>{worker.email}</p>
                    </span>
                </span>
                <p class='text-right'>
                    <Moment unix>{workOrders.deadline}</Moment>
                </p>
            </article>
        );
    }
}

export default WorkOrder;