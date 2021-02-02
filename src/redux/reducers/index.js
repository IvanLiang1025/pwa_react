

import { combineReducers} from "redux";
// import {headerReducer} from "../common/header/headerStore/index";
// import {homeReducer} from "../pages/home/store";
// import {detailReducer} from "../pages/detail/store";
import logInReducer from './login';
import userOrdersReducer from './userOrders';
// import tagReducer from '@/pages/Admin/Tag/store/reducers';
// import categoryReducer from '@/pages/Admin/Category/store/reducers';
// import blogReducer from '@/pages/Admin/Blog/store/reducers';
import { connectRouter } from 'connected-react-router';
import {history} from '@/utils/history';


// const createRootReducer = (history) => combineReducers({
//   router: connectRouter(history),
//   logIn: logInReducer,
//   userOrders: userOrdersReducer,
// });

// export default createRootReducer


const reducer = combineReducers({
    router: connectRouter(history),
    //  header: headerReducer,
    //  home: homeReducer,
    //  detail: detailReducer,
     logIn: logInReducer,
     userOrders: userOrdersReducer,
   
})

export default reducer;