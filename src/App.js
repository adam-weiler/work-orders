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
            loaded: false,

            // workerList: []
        }
    }

    async componentDidMount() {
        const self = this;

        axios.get('https://www.hatchways.io/api/assessment/work_orders')
        .then(function (response) {
            console.log('First then;')
            self.setState({
                // workOrders: self.sortByDate(response.data.orders)
            })
            // console.log(self.state.workOrders)
            
            console.log('Second then;', response)
            // console.log(self.state.workOrders)
                let temp = response.data.orders;
                // console.log(temp)
                // let temp;
                let temp3 = []

                let temp2 = temp.map(eachOrder => {
                    axios.get(`https://www.hatchways.io/api/assessment/workers/${eachOrder.workerId}`)
                    .then(function (response) {
                        // eachOrder['userData'] = response.data.worker
                        eachOrder['companyName'] = response.data.worker.companyName;
                        eachOrder['email'] = response.data.worker.email;
                        eachOrder['image'] = response.data.worker.image;
                        eachOrder['userName'] = response.data.worker.name; //This definitely works!


                        temp3.push ({ 'companyName': response.data.worker.companyName,
                                      'email': response.data.worker.email,
                                      'id': response.data.worker.id,
                                      'image': response.data.worker.image,
                                      'workerName': response.data.worker.name })

                    })
                    return eachOrder;
                })

                // console.log('Our temp', temp2)
                console.log('Our temp3', temp3)

                self.setState({
                    workOrders: self.sortByDate(response.data.orders),
                    workerList: temp3,
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
        console.log('Toggle')
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

                { !this.state.loaded ? 
                    <div>Loading</div>
                :
                    <WorkOrders onSearchChange={this.onSearchChange} handleToggle={this.handleToggle} workOrders={filteredWorkOrders} workerList={this.state.workerList} />
                }
            </div>
        );
    }
}

export default App;
