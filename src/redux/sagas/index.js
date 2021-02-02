import { all, call } from 'redux-saga/effects';
import loginSaga from './login';
import userOrderSaga from './userOrders';
// import tagSaga from '@/pages/Admin/Tag/store/saga';
// import categorySaga from '@/pages/Admin/Category/store/saga';
// import blogSaga from '@/pages/Admin/Blog/store/saga';

// import gloablSaga from '@'

export default function* rootSaga() {
  yield all([
    call(loginSaga),
    call(userOrderSaga)
    // call(tagSaga),
    // call(categorySaga),
    // call(blogSaga),
    // loginSaga()
  ]);
}