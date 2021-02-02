// use localStorage to store the authority info, which might be sent from server in actual project.
import { setCrossSubdomainCookie, str2b64 } from './utils';
import globalData from '../globalData';

export function getSessionId() {
  return localStorage.getItem('rtc-session-id');
}

export function getAccessToken() {
  return localStorage.getItem('rtc-access-token');
}

export function setSessionId(sessionId) {
  localStorage.setItem('rtc-session-id', sessionId);
  // wiley 20200721 save global sessionId
  globalData.g_sessionId = sessionId;
}
export function setAccessToken(accessToken) {
  localStorage.setItem('rtc-access-token', accessToken);
}

export function setLoginDate() {
  const cacheVal = {
    val: new Date().getTime(),
  };
  localStorage.setItem('rtc-login-date', JSON.stringify(cacheVal));
}


export function getLoginDate() {
  const cacheValString = localStorage.getItem('rtc-login-date');
  if (!cacheValString) {
    return 0;
  }
  const cacheVal = JSON.parse(cacheValString);
  return cacheVal.val;
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;

  // sunny 20200505 homapage webinar video page authority
  // if (document.domain !== 'localhost') {
  //   setCrossSubdomainCookie('mykey', 'abc123', 3);
  // }
  // 20200521 change authority name
  return localStorage.setItem('rtc-app-authority', JSON.stringify(proAuthority));
}

// 20200521 wiley set cookie
export function setUserCookie(userInfo, role) {

  const key = '_RT_CVVVVTSFQD2F';
  const val = `${role};;${userInfo.name};;${userInfo.avatar};;${userInfo.plusLevel}`;
  setCrossSubdomainCookie(key, str2b64(val), 2); // 2days
}
// 20200521 wiley remove cookie
export function removeUserCookie() {
  const key = '_RT_CVVVVTSFQD2F';
  setCrossSubdomainCookie(key, '', -1);
}

// set this when logined
export function setLoginAuthority(sessionId, accessToken, role) {
  console.log('======= set login authority---------------------');
  setSessionId(sessionId);
  setAccessToken(accessToken);
  setLoginDate();
  if (role === 1) {
    setAuthority('user');
  } else if (role === 2) {
    setAuthority('lawyer');
  } else if (role === 99) {
    setAuthority('admin');
  }
}

export function resetAuthority() {
  setAuthority('guest');
  localStorage.removeItem('rtc-session-id');
  localStorage.removeItem('rtc-access-token');
  localStorage.removeItem('rtc-login-date');
  // 20200521 wiley remove cookie
  removeUserCookie();
}
export function getAuthority(str) {
  // return localStorage.getItem('rtc-app-authority') || ['admin', 'user'];
  const authorityString =
    typeof str === 'undefined' ? localStorage.getItem('rtc-app-authority') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;

  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  // if (typeof authority === 'string') {
  //   return [authority];
  // }
  // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  // if (!authority && ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
  //   return ['admin'];
  // }
  // console.log('getAuthority',authority)

  if (authority && authority.length > 0 && authority[0] !== 'guest') {
    // here to check the login state
    const now = new Date().getTime();
    const loginTime = getLoginDate();
    if (now - loginTime > 250000000) {
      // 3 days
      resetAuthority();
      return ['guest'];
    }
  }
  return authority;
}

// ivan 20200722 
export function getUserRole() {
  const auth = getAuthority();
  // console.log(auth);
  if (auth && auth[0] === 'user') {
    return 1;
  } else if (auth && auth[0] === 'lawyer') {
    return 2
  }
  return 0;
}
