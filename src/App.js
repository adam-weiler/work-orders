import React, { Component } from 'react';
import axios from 'axios';  // Used for API requests.
import './App.css';

// Smaller components:
import SearchBox from './Components/SearchBox/SearchBox.js';
import ToggleSwitch from './Components/ToggleSwitch/ToggleSwitch.js';
import WorkOrders from './Components/WorkerOrders/WorkOrders.js';

class App extends Component {
    constructor() {
        super();
        this.state = {
            searchFilter: '',  // The user's search input. Default is empty.
            datesInOrder: true,  // Are the dates shown chronological. Default is true.
            workOrders: [],  // Stores results of the API requests.
            loaded: false,  // Is the page ready to load. Default is false.
        }
        this.makeApiRequests();
    }

    async makeApiRequests() {
        const self = this;

        axios.get('https://www.hatchways.io/api/assessment/work_orders')  // Get a full list of work orders.
        .then(function (response) {
            response.data.orders.map(eachOrder => {  // Goes through each work order and gets information about the worker assigned.
                axios.get(`https://www.hatchways.io/api/assessment/workers/${eachOrder.workerId}`)
                .then(function (response) {
                    eachOrder['companyName'] = response.data.worker.companyName;
                    eachOrder['email'] = response.data.worker.email;
                    eachOrder['image'] = response.data.worker.image;
                    eachOrder['userName'] = response.data.worker.name;
                })
                return eachOrder;
            })

            self.setState({
                workOrders: self.sortByDate(response.data.orders),
                loaded: true
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

    onSearchChange = (event) => {  // Triggers on each keystroke of search box.
        this.setState({
            searchFilter: event.target.value
        });
    }

    handleToggle = () => {
        let newWorkOrders;

        if (this.state.datesInOrder) {  // If dates are in order, sort by reverse order.
            newWorkOrders = this.sortByDateReverse(this.state.workOrders);
        } else {  // Else dates are in reverse order, sort by chronological order.
            newWorkOrders = this.sortByDate(this.state.workOrders);
        }
        
        this.setState({
            workOrders: newWorkOrders,
            datesInOrder: !this.state.datesInOrder
        });
    }

    render() {
        let filteredWorkOrders;

        if (!this.state.searchFilter) {  // If there is no search filter, display all work orders.
            filteredWorkOrders = this.state.workOrders;
        } else {
            filteredWorkOrders = this.state.workOrders.filter(order => {  // Else apply search filter onto userName of work orders.
                return order.userName.toLowerCase().includes(this.state.searchFilter.toLowerCase())
            })
        }

        return (
            <div className="App">
                <h1>Work Orders:</h1>
                <SearchBox onSearchChange={this.onSearchChange} />
                <ToggleSwitch handleToggle={this.handleToggle} />

                { !this.state.loaded ? 
                    <div>Loading</div>
                :
                    <WorkOrders workOrders={filteredWorkOrders} />
                }
            </div>
        );
    }
}

export default App;
