import React from 'react';
import {
  isNotificationSupported,
  isPushNoteSupported,
  requestNotificationPermission,
  subscribeAndDistribute,
  getSwRegistration
} from '../../pushNotification.js';
import {
  Button
} from 'antd';


class Order extends React.PureComponent{

  constructor(){
    super();
    const state = {
      orderList: []
    }
  }

  handleShowNotification = (e) => {
    console.log('hehe')
    requestNotificationPermission().then(() => {
      getSwRegistration().then(registration => {
        console.log(registration)
        subscribeAndDistribute(registration)
      })
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    // const {orderList} = this.state;
    // console.log(isPushNoteSupported());
    // console.log(isNotificationSupported());

    if(isPushNoteSupported() && isNotificationSupported()){
      return (
        <div>
          We would like to send notification to you when there are any notifications related to your order
          <Button type='primary' onClick={this.handleShowNotification}>Got it</Button> 
        </div>
      )
    }
    
    return (
      <div>
        <div>
          The browser does not support push function 
        </div>
      </div>
    )
  }
}

export default Order;
