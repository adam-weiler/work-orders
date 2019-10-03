import React, { Component } from 'react';

// Smaller components:
import WorkOrder from './WorkOrder/WorkOrder.js';

import './WorkOrders.css';

class WorkOrders extends Component {
    render() {
        const jsonElements = this.props.workOrders.map(
            (elem) => <WorkOrder key={elem.id} workOrders={elem} />
        )

        return (
            <section className='work-orders'>
                {jsonElements}
            </section>
        );
    }
}

export default WorkOrders;