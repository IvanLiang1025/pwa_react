/**
 * request 网络请求工具
 * 更详细的api文档: https://bigfish.alipay.com/doc/api#request
 */
import { extend } from 'umi-request';
import { message } from 'antd';
// import router from 'umi/router';
import { getSessionId, getAccessToken, getAuthority } from './authority';
import globalData from '../globalData';
import { getLocalTimeOffset } from './utils';

const codeMessage = {
  // 200: '服务器成功返回请求的数据。',
  // 201: '新建或修改数据成功。',
  // 202: '一个请求已经进入后台排队（异步任务）。',
  // 204: '删除数据成功。',
  // 400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  // 401: '用户没有权限（令牌、用户名、密码错误）。',
  // 403: '用户得到授权，但是访问是被禁止的。',
  // 404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  // 406: '请求的格式不可得。',
  // 410: '请求的资源被永久删除，且不会再得到的。',
  // 422: '当创建一个对象时，发生一个验证错误。',
  // 500: '服务器发生错误，请检查服务器。',
  // 502: '网关错误。',
  // 503: '服务不可用，服务器暂时过载或维护。',
  // 504: '网关超时。',
};

// wiley 20200721 handle401
const handle401 = ()=>{
  const auth = getAuthority();
  // console.log('==========',auth)
  const isLawyer = auth && auth[0] === 'lawyer';
  if (isLawyer) {
    window.g_app._store.dispatch({
      type: 'login2/logout',
    });
  }  else {
    window.g_app._store.dispatch({
      type: 'login/logout',
    });
  }
}
// wiley 20200721 handle403
const handle403 = ()=>{
  message.warn('It seems you have signed in as another role.');
  const auth = getAuthority();
  // console.log('==========',auth)
  const isLawyer = auth && auth[0] === 'lawyer';

  console.log(auth);
  if (isLawyer) {
    window.g_app._store.dispatch({
      type: 'login2/gotologin',
    });
  }else {
    window.g_app._store.dispatch({
      type: 'login/gotologin',
    });
  }
}
// wiley 20200721 thisUrlNeedPermission
const thisUrlNeedPermission = (url) =>{
  if(!url)return false;
  return url.indexOf('/sme/')>0 ||
  url.indexOf('/lawyer/')>0 ||
  url.indexOf('/user/')>0 ||
  url.indexOf('/changepassword')>0;
}

/**
 * 异常处理程序
 */
const errorHandler = error => {
  const { response = {} } = error;
  const errortext = codeMessage[response.status] || response.statusText;
  const { status, url } = response;
  console.log('error',error)
  // 20200721 wiley 403 should relogin
  if (status === 401) {
    handle401();
  } else if (status === 403 || error.message === '403') {
    handle403();
  } else {
    message.error('System Error');
  }

  // environment should not be used
  // if (status === 403) {
  //   router.push('/exception/403');
  //   return;
  // }
  // if (status <= 504 && status >= 500) {
  //   router.push('/exception/500');
  //   return;
  // }
  // if (status >= 404 && status < 422) {
  //   router.push('/exception/404');
  // }
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  prefix: globalData.serverUrl,
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  requestType: 'form',
});
/* eslint-disable no-param-reassign */
request.interceptors.request.use((url, options) => {
  const sessionId = getSessionId();
  const token = getAccessToken();
  const tz = getLocalTimeOffset().toString();


  // console.log('--url---',url)
  // console.log('--session in localStorage---',sessionId)
  // console.log('--session in global---',globalData.g_sessionId)
  // wiley 20200721 sessionId not equal
  if(sessionId && globalData.g_sessionId && sessionId !== globalData.g_sessionId
    && thisUrlNeedPermission(url)){
    throw new Error("403");
  }

  if (sessionId) {
    console.log(url, sessionId, token);
    options.headers = {
      ...options.headers,
      x_sessionid_token: sessionId,
      x_access_token: token,
      x_timezone_token: tz,
    };
  } else {
    options.headers = {
      ...options.headers,
    };
  }

  // console.log(options)
  return {
    url: `${url}`,
    options: {
      ...options,
    },
  };
});

// request.interceptors.response.use((response, options) => {
//   console.log('interceptors response code:',response.status)
//   if(response.status === 200){
//     response.json().then(res=>{
//       console.log('interceptors response',res);
//     }).catch(res=>{
//       console.log('interceptors responseCatch',res);
//     })

//   }

//   return response;
// });

export default request;
