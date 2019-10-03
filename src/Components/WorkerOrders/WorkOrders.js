import React, { Component } from 'react';

// import axios from 'axios';  // Used for API requests.

// Smaller components:
import SearchBox from './SearchBox/SearchBox.js';
import ToggleSwitch from './ToggleSwitch/ToggleSwitch.js';
import WorkOrder from './WorkOrder/WorkOrder.js';

import './WorkOrders.css';

class WorkOrders extends Component {
    constructor() {
        super();
        this.state = {
            loaded: false,
        }
    }

    componentDidMount() {
        

        this.setState({
            loaded: true
        })

    }

    render() {
        let jsonElements;
 
        jsonElements = this.props.workOrders.map(
            // (elem, id) => <WorkOrder key={elem.id} workOrders={elem} workerList={this.props.workerList} updateWorkerList={this.props.updateWorkerList} />
            (elem, id) => <WorkOrder key={elem.id} id={id} workOrders={elem} workerList={this.props.workerList} handleToggle={this.props.handleToggle} />
        )

        return (
            !this.state.loaded ? 
                <div>Loading</div>
            :
            <>
                <SearchBox onSearchChange={this.props.onSearchChange} />
                <ToggleSwitch handleToggle={this.props.handleToggle} />
                <section className='work-orders'>
                    {jsonElements}
                </section>
            </>
        );
    }
}

export default WorkOrders;