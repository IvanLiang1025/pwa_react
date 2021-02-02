
import {put, call, delay, takeLatest, takeEvery, all} from 'redux-saga/effects';
// import actionTypes from '../actions/actionTypes';
import { apiPost, parseResList,apiGet } from '@/services/api';
import {types as actionTypes} from '../reducers/userOrders';


export function* fetchOrders (action) {
  const {payload, callback} = action;
  // console.log(action)
  const response = yield call(apiGet, '/sme/orders', payload);
  // const result = parseResSubmit(response);
  // console.log(response)
  const result = parseResList(response);

  if(result){
    yield put({
      type: actionTypes.SAVE_ORDERS,
      payload: result.list
    })
  }

  
}



export default function* rootSaga() {
 
  yield takeLatest(actionTypes.FETCH_ORDERS, fetchOrders)

}



