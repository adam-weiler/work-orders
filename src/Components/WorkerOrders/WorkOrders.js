import React, { Component } from 'react';

import axios from 'axios'

import WorkOrder from './WorkOrder/WorkOrder.js'

import './WorkOrders.css';



class WorkOrders extends Component {
    constructor() {
        super();
    this.state = {
        queryResults: []
    }
}


    componentDidMount() {
        const self = this;
        console.log('Main Component did mount!');

        let JSONresults;

        axios.get('https://www.hatchways.io/api/assessment/work_orders')
        .then(function (response) {
            console.log(response.data);
            // JSONresults = response.data.orders; 
            // console.log(JSONresults)

            self.setState({
                queryResults: response.data.orders
            })

            // let jsonElements = JSONresults.map(
            //     (elem, id) => <WorkOrder />
            // )

        })
    
        window.scrollTo(0, 0); //Brings user to top of page.
    }

    render() {
        let jsonElements;

        if (this.state.queryResults) {
            console.log('Yes!')
            console.log(this.state.queryResults)
            jsonElements = this.state.queryResults.map(
                (elem, id) => <WorkOrder key={elem.id} jsonData={elem} />
            )
        }
        

        return (
            <section>
                All work orders:
                {jsonElements}
            </section>
        );
    }
}

export default WorkOrders;