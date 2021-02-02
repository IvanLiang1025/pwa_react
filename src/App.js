import React from 'react';
import logo from './logo.svg';
// import bgImg from '%PUBLIC_URL%/images/1.png';
import bgImg2 from './images/3.jpg';
import './App.css';
import { awsImageUrl } from './globalData';
import Notification from './pages/Order/index';
// import

// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {  Route, Switch } from "react-router";
import Home from './pages/Home/index';
import Login from './pages/login/index';
import OrderList from './pages/List/index';
import Videos from './pages/Videos/index';
import { Provider } from 'react-redux';
import store from './redux/store';
import { history } from '@/utils/history';
import { ConnectedRouter } from 'connected-react-router';



function App() {
  // console.log(history)
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path='/' exact component={Home}></Route>
          <Route path='/home' exact component={Home}></Route>
          <Route path='/login' exact component={Login}></Route>
          <Route path='/sme/account/orders' exact component={OrderList}></Route>
          <Route path='/videos' exact component={Videos}></Route>
          <Route path='/notification' exact component={Notification}></Route>
        </Switch>
      </ConnectedRouter>
    </Provider>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //     {/* public 目录下资源 */}
    //     <img width={100} height={100} src={process.env.PUBLIC_URL + '/images/1.png'} className="App-logo" alt="logo" />
    //     {/* src 目录下图片资源，已经被预缓存 */}
    //     <img width={100} height={100} src={bgImg2} className="App-logo" alt="logo" />
    //     {/*  test fetch server image*/}
    //     <img width={100} height={100} src={awsImageUrl}></img>

    //   </header>
    // </div>
  );
}

export default App;
