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
            loaded: false
        }
    }

    async componentDidMount() {
        const self = this;

        axios.get('https://www.hatchways.io/api/assessment/work_orders')
        .then(function (response) {
            console.log('First then;')
            self.setState({
                workOrders: self.sortByDate(response.data.orders)
            })
            // console.log(self.state.workOrders)
        })
        .then(function (response) {
            console.log('Second then;')
                let temp = self.state.workOrders;

                temp = temp.map(order => {
                    axios.get(`https://www.hatchways.io/api/assessment/workers/${order.workerId}`)
                    .then(function (response) {
                        order['userData'] = response.data.worker
                        order['companyName'] = response.data.worker.companyName;
                        order['email'] = response.data.worker.email;
                        order['image'] = response.data.worker.image;
                        order['userName'] = response.data.worker.name; //This definitely works!
                    })
                    return order;
                })

                self.setState({
                    workOrders: temp,
                    loaded: true
                })
                // }, () => console.log(self.state))
        });
        // console.log(self.state.workOrders)

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
        // console.log(this.state)
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
        let filteredWorkOrders;

        if (!this.state.searchFilter) {
            filteredWorkOrders = this.state.workOrders;
        } else {
            filteredWorkOrders = this.state.workOrders.filter(order => {
                return order.userName.toLowerCase().includes(this.state.searchFilter.toLowerCase()) //This definitely works

                // return order.userData.name.toLowerCase().includes(this.state.searchFilter.toLowerCase())
            })
        }

        return (
            <div className="App">
                <h1>Work Orders:</h1>
                {/* <WorkOrders workOrders={this.state.workOrders} workerList={this.state.workerList} updateWorkerList={this.updateWorkerList} onSearchChange={this.onSearchChange} handleToggle={this.handleToggle}/> */}

                {/* {this.state.loaded ?  */}
                <WorkOrders onSearchChange={this.onSearchChange} handleToggle={this.handleToggle} workOrders={filteredWorkOrders} />
                  {/* : <div>Loading</div>} */}
            
            </div>
        );
    }
}

export default App;
