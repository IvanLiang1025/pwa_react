import React from 'react';

import {
  Button,
  Form,
  Input,
  message
} from 'antd';

import {encodePass} from '@/utils/utils';
import { connect } from "react-redux";
import {actions as LoginActions} from '@/redux/reducers/login';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';


// @Form.create()

class Login extends React.PureComponent{

  constructor(){
    super();
    this.state = {
      email: 'ivan@trustiics.com',
      password: '123456',
    }
  }

  handleLogin = () => {
    const {email, password} = this.state;
    const {actions} = this.props;
    console.log(email)
    if(!email || !password) {
      message.error("Please input your email and password");
    }
    const postData = {
      userName: email,
      password: encodePass(password),
      role: 0
    }

    actions.login(postData);
  }

 

  render() {
    
    // const {form} = this.props;
    // console.log(form);
    const {email, password} = this.state;
    console.log(this.props.logInStatus)
    console.log(this.props.location);
  
    return (
      <div>
        <div>
          <div>Email</div>
          <Input
            onChange={(e) => this.setState({email: e.target.value})}
            value={email}
          >
          </Input>
        </div>
        <div>
          <div>password</div>
          <Input
            onChange={(e) => this.setState({password: e.target.value})}
            value={password}
          />
        </div>
        <div><Button type='primary' onClick={this.handleLogin}>confirm</Button></div>
        <Link to='/'>back to home</Link>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    logInStatus: state.logIn.logInStatus,
    location: state.router.location,
  }
}
const mapDispatchToProps = dispatch => ({actions: bindActionCreators(LoginActions, dispatch)})
// const mapDispatchToProps = (dispatch) => {
//   return {
//     login(payload, callback) {
//       // const username = usernameEle.value;
//       // const password = passwordEle.value;
//       // console.log(username, password);
//       dispatch({
//         type: 'SET_LOGIN_STATUS',
//         payload,
//         callback,
//       });
//     }
//     // ...bindActionCreators({
//     //   login: setLogInStatus
//     // }, dispatch),
//     // logIn(usernameEle, passwordEle){
//     //     const username = usernameEle.value;
//     //     const password = passwordEle.value;
//     //     console.log(username, password);
//     //     dispatch(actionCreators.checkLogIn(username, password));

//     // }
//   }
// }
 

export default connect(mapStateToProps, mapDispatchToProps)(Login);
