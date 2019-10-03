import React, { Component } from 'react';
import Moment from 'react-moment';  // Used to convert timestamp to date.
import './WorkOrder.css';

class WorkOrder extends Component {  
    render() {
        Moment.globalFormat = 'D/MM/YYYY, h:MM:SS A';  // Sets Moment default. ie: 1/01/2019, 1:10:00 PM
        
        const workOrders = this.props.workOrders;

        return (
            <article className='work-order'>
                <h2>{workOrders.name}</h2>
                <p className='text-left'>{workOrders.description}</p>
                <span className='profile-info'>
                    <img src={workOrders.image} alt={workOrders.name} className='profile-image' />
                    <span className='profile-text text-left'>
                        <p>{workOrders.userName}</p>
                        <p>{workOrders.companyName}</p>
                        <p>{workOrders.email}</p>
                    </span>
                </span>
                <p className='text-right'>
                    <Moment unix>{workOrders.deadline}</Moment>
                </p>
            </article>
        );
    }
}

export default WorkOrder;