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
            })
            console.log(self.state.workOrders)
            console.log('First then')
        })
        .then(function (response) {
            // console.log('aa')

                let temp = self.state.workOrders;

                temp = temp.map(order => {
                    axios.get(`https://www.hatchways.io/api/assessment/workers/${order.workerId}`)
                    .then(function (response) {
                        console.log(response.data.worker)
                        console.log(response.data.worker.name)
                        // console.log('Worker id', response.data.worker)
                        
                        
                        order['userData'] = response.data.worker
                        order['userName'] = response.data.worker.name; //This definitely works!


                        // companyName, email, image, name
                    })
                    return order
                })

                self.setState({
                    workOrders: temp
                })
                // }, () => console.log(self.state))
                console.log(self.state.workOrders)
                console.log('SEcond then')
        })
            
            
                
        
        

        // console.log('Saved is this:', this.state.workOrders)

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

    handleFilters = (event) => {
        
    }

    render() {
        // console.log(this.state.workOrders)

        let filteredWorkOrders;


        if (!this.state.searchFilter) {
            filteredWorkOrders = this.state.workOrders;

        } else {
            filteredWorkOrders = this.state.workOrders.filter(order => {
            console.log('Filtering')
            // console.log(order)
            // console.log(JSON.stringify(order));
            // console.log(order['userData'])
            // console.log(order.userData[0])
            // return order.workerId == 4
            // return order.userName == this.state.searchFilter
            // return order.userName.toLowerCase().includes(this.state.searchFilter.toLowerCase()) //This definitely works

            return order.userData.name.toLowerCase().includes(this.state.searchFilter.toLowerCase())

        })
        }

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
