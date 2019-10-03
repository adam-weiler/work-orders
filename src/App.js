import React, { Component } from 'react';

import axios from 'axios';  // Used for API requests.

import './App.css';

// Smaller components:
import WorkOrders from './Components/WorkerOrders/WorkOrders.js';

class App extends Component {
    constructor() {
        super();
        this.state = {
            searchFilter: '',
            datesInOrder: true,
            workOrders: [],
            // workerList: new Set()
        }
    }

    componentDidMount() {
        const self = this;

        axios.get('https://www.hatchways.io/api/assessment/work_orders')
        .then(function (response) {
            self.setState({
                workOrders: self.sortByDate(response.data.orders)
            }, () => {
                self.state.workOrders.map(order => {
                    axios.get(`https://www.hatchways.io/api/assessment/workers/${order.workerId}`)
                    .then(function (response) {
                        order.userData = [response.data.worker]
                    })
                })
                // self.setState({
                //     workersData
                // }, () => console.log(self.state))
            })
        });

        window.scrollTo(0, 0); //Brings user to top of page.
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

     onSearchChange = (event) => {
        this.setState({
            searchFilter: event.target.value
        });
        console.log(this.state)
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

    render() {
        const filteredWorkOrders = this.state.workOrders.filter(user => {
            return user.workerId == 1

        })

        return (
            <div className="App">
            <h1>Work Orders:</h1>
            {/* <WorkOrders workOrders={this.state.workOrders} workerList={this.state.workerList} updateWorkerList={this.updateWorkerList} onSearchChange={this.onSearchChange} handleToggle={this.handleToggle}/> */}

            <WorkOrders onSearchChange={this.onSearchChange} handleToggle={this.handleToggle} workOrders={filteredWorkOrders} />
            </div>
        );
    }
}

export default App;
