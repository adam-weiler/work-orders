import React, { Component } from 'react';

import axios from 'axios';  // Used for API requests.

// Smaller components:
import WorkOrder from './WorkOrder/WorkOrder.js'

import './WorkOrders.css';



class WorkOrders extends Component {
    constructor() {
        super();
        this.state = {
            workOrders: []
        }
    }


    componentDidMount() {
        const self = this;
        console.log('Main Component did mount!');

        let JSONresults;

        axios.get('https://www.hatchways.io/api/assessment/work_orders')
        .then(function (response) {
            self.setState({
                workOrders: response.data.orders
            });
        });
    
        window.scrollTo(0, 0); //Brings user to top of page.
    }

    render() {
        let jsonElements;

        if (this.state.workOrders) {
            console.log('Yes!')
            console.log(this.state.workOrders)
            jsonElements = this.state.workOrders.map(
                (elem, id) => <WorkOrder key={elem.id} workOrders={elem} />
            )
        }
        

        return (
            <section className='work-orders'>
                {jsonElements}
            </section>
        );
    }
}

export default WorkOrders;