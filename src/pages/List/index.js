import React from 'react';

import {
  Button,
  Form,
  Input,
  message
} from 'antd';

import {actions as userOrderActions} from '@/redux/reducers/userOrders';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';



// @Form.create()

class OrderList extends React.PureComponent {

  constructor() {
    super();
    this.state = {
      list: []
    }
  }


  // fetchList = async () => {
  //   const response = yield call(apiGet,'/sme/orders', data);
  //   const result = parseResList(response, pagination);
  //   if(result){
  //     yield put({
  //       type: 'save1',
  //       payload: result,
  //     });
  //   }
  // }

  componentDidMount() {
    const data = {
      status: 1,
      // page:pagination.current,
      // limit:pagination.pageSize,
      // count:pagination.total
    };
    const {actions} = this.props;
    console.log(actions);

    actions.fetchOrders(data);

    // const response = await apiGet('/sme/orders', data);
    // const result = parseResList(response);
    // if (result) {
    //   this.setState({
    //     list: result.list
    //   })
    // }
  }



  render() {
    // const {list} = this.state;
    // console.log(this.state);
    const {userOrders} = this.props;

    return (
      <div>
        Order List

        {
          userOrders && userOrders.map(item => {
            return (
              <div key={item.orderId}> {item.orderId} </div>
            )
          })
        }

        <div>
          test cache image/video resource located at aws s3
           
          <div>
          <img width={100} height={100} src={"https://res.trustiics.com/res-localdev/B1ON19980686ROKxZcvAt20210110212148.jpg"}></img>
          </div>
        </div>
        {/* <Link to='/videos'>videos</Link> */}
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    userOrders: state.userOrders.data1.list
  }
}
const mapDispatchToProps = dispatch => ({actions: bindActionCreators(userOrderActions, dispatch)})

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
