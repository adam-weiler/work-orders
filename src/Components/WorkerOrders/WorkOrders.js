import React, { Component } from 'react';

import axios from 'axios';  // Used for API requests.

// Smaller components:
import SearchBox from './SearchBox/SearchBox.js';
import ToggleSwitch from './ToggleSwitch/ToggleSwitch.js';
import WorkOrder from './WorkOrder/WorkOrder.js';

import './WorkOrders.css';



class WorkOrders extends Component {
    constructor() {
        super();
        this.state = {
            searchFilter: '',
            datesInOrder: true,
            workOrders: [],
            workerList: new Set()
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

    updateWorkerList = (newWorker) => {
        console.log('New worker!', newWorker)

        this.setState(({ workerList }) => ({
             workerList: this.state.workerList.add(newWorker.id).add(newWorker.name)
          }));

        // this.setState(previousState => ({
        //     workerList: [...previousState.workerList, newWorker.id]
        // }));

        // this.setState({
        //     workerList: this.state.workerList.concat({id:newWorker.id, name:newWorker.name})
        // })

        console.log('break')
        console.log(this.state.workerList);
    }

    onSearchChange = (event) => {
        this.setState({
            searchFilter: event.target.value
        });

        // let newWorkOrders;

        // if (this.state.datesInOrder) {
        //     newWorkOrders = this.sortByDateReverse(this.state.workOrders);
        // } else {
        //     newWorkOrders = this.sortByDate(this.state.workOrders);
        // }
        
        // this.setState({
        //     workOrders: newWorkOrders,
        // });

        // console.log('down here')

        console.log(this.state.workOrders)

        var newArray = this.state.workOrders.filter(function (el) {
            return el.workerId == 0; // Changed this so a home would match
          });

          console.log(newArray)

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
                (elem, id) => <WorkOrder key={elem.id} workOrders={elem} workerList={this.state.workerList} updateWorkerList={this.updateWorkerList} />
            )
        }

        return (
            <>
                <SearchBox searchChange={this.onSearchChange} />
                <ToggleSwitch handleToggle={this.handleToggle}/>
                <section className='work-orders'>
                    {jsonElements}
                </section>
            </>
        );
    }
}

export default WorkOrders;