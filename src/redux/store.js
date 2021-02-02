import {createStore, compose, applyMiddleware} from "redux";
import reducer from "./reducers";
// import thunk from "redux-thunk";
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import {composeWithDevTools} from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import {history} from '@/utils/history';


// export const history = createBrowserHistory();



const sagaMiddleware = createSagaMiddleware();

const middleWares = [
  sagaMiddleware,
  routerMiddleware(history)
]

// console.log(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
const composeEnhancers = process.env.NODE_ENV === 'production' ? compose(applyMiddleware(...middleWares)) 
                        : composeWithDevTools(applyMiddleware(...middleWares));

const store = createStore(reducer, composeEnhancers);



sagaMiddleware.run(rootSaga);


export default store;