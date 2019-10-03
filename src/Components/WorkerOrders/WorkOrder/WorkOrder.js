import React, { Component } from 'react';

// import axios from 'axios';  // Used for API requests.
import Moment from 'react-moment';  // Used to convert timestamp to date.

import './WorkOrder.css';

class WorkOrder extends Component {
    constructor() {
        super();
        this.state = {
            loaded: false,
            userData: ''
        }
    }

    async componentDidMount() {
        // console.log('loading done!', this.props.workOrders)
        console.log('Mounted!')
        // console.log(this.props.workerList)
        // console.log(this.props.id)

        this.setState({
            userData: this.props.workerList
        })

        if (this.state.userData[0]) {
            // console.log('!!?!?!?!yesssss', this.state.userData)
        } else {
            // console.log('!?!?!?!?!nooooo')
        }

        this.props.handleToggle()
        
    }

    async componentDidUpdate() {
        // console.log('loading done!', this.props.workOrders)
        console.log('Updated')
        // console.log(this.props.workerList)
        // console.log(this.props.id)

        if (this.state.userData[0]) {
            // console.log('yesssss', this.state.userData)
        } else {
            // console.log('nooooo')
        }

        
        
    }
    
    render() {
        let workOrders = this.props.workOrders;
        // console.log('dnoe')
        // console.log(workOrders)  


        if (this.props.workerList[0]) {
            // console.log('yes', this.props.workerList)
        } else {
            // console.log('no')
        }



    
        Moment.globalFormat = 'D/MM/YYYY, h:MM:SS A';

        return (
            
                <article className='work-order'>
                    <h2>{workOrders.name}</h2>
                    <p className='text-left'>{workOrders.description}</p>
                    <span className='profile-info'>
                        {/* {this.props.workerList[0].userName} */}


                        <img src={workOrders.image} alt={workOrders.name} className='profile-image' />
                        <span className='profile-text text-left'>
                            <p>{workOrders.userName}</p>
                            <p>{workOrders.companyName}</p>
                            <p>{workOrders.email}</p>
                        </span>
                    </span>
                    <p className='text-right'>
                        <Moment unix>{workOrders.deadline}</Moment>
                    </p>
                </article>
        );
    }
}

export default WorkOrder;