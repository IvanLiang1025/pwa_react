
import {put, call, delay, takeLatest, takeEvery} from 'redux-saga/effects';
import {types as actionTypes} from '../reducers/login';
import { apiPost, parseResSubmit } from '@/services/api';
import {setLoginAuthority} from '@/utils/authority';
import {push} from 'connected-react-router';

export function* LogIn (action) {
  const {payload, callback} = action;
  console.log(action)
  const response = yield call(apiPost, '/login', payload || {});
  const result = parseResSubmit(response);
  console.log(result)

  if(result){
    yield put({
      type: actionTypes.SET_LOGIN_STATUS,
      payload: true
    })
    const { sessionId, accessToken, incomplete, role } = result;
    setLoginAuthority(sessionId, accessToken, role);
  
    yield put(push('/sme/account/orders'))
  }

  if(callback) callback(result);

}



export default function* rootSaga() {
  yield takeEvery(actionTypes.LOGIN, LogIn)
}



