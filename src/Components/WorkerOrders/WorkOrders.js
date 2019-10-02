import React, { Component } from 'react';

import axios from 'axios';  // Used for API requests.

// Smaller components:
import ToggleSwitch from './ToggleSwitch/ToggleSwitch.js'
import WorkOrder from './WorkOrder/WorkOrder.js'

import './WorkOrders.css';



class WorkOrders extends Component {
    constructor() {
        super();
        this.state = {
            workOrders: [],
            datesInOrder: true
        }
    }


    sortByDate = (arr) => {  // Sorts list of objects by date from earliest to latest.
        arr.sort(function(a, b) {
            return a.deadline - b.deadline
        });
        return arr;
    }

    sortByDateReverse = (arr) => {  // Sorts list of objects by date from latest to earliest.
        arr.sort(function(a, b) {
            return b.deadline - a.deadline
        });
        return arr;
    }

    handleToggle = () => {
        let newWorkOrders;

        if (this.state.datesInOrder) {
            newWorkOrders = this.sortByDateReverse(this.state.workOrders);
        } else {
            newWorkOrders = this.sortByDate(this.state.workOrders);
        }
        
        this.setState({
            workOrders: newWorkOrders,
            datesInOrder: !this.state.datesInOrder
        });
    }


    componentDidMount() {
        const self = this;

        axios.get('https://www.hatchways.io/api/assessment/work_orders')
        .then(function (response) {
            self.setState({
                workOrders: self.sortByDate(response.data.orders)
            });
        });
    
        window.scrollTo(0, 0); //Brings user to top of page.
    }

    render() {
        let jsonElements;

        if (this.state.workOrders) {
            jsonElements = this.state.workOrders.map(
                (elem, id) => <WorkOrder key={elem.id} workOrders={elem} />
            )
        }

        return (
            <>
                <ToggleSwitch handleToggle={() => this.handleToggle()}/>
                <section className='work-orders'>
                    {jsonElements}
                </section>
            </>
        );
    }
}

export default WorkOrders;