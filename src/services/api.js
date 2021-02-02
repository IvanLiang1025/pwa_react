import { stringify } from 'qs';
import request from '../utils/request';
import { message } from 'antd';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  console.log('queryRule', params);
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params = {}) {
  return request(`/api/rule?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  // return request('/api/forms', {
  //   method: 'POST',
  //   data: params,
  // });
  return { message: 'Ok' };
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile(id) {
  return request(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  // return request('/api/login/account', {
  //   method: 'POST',
  //   data: params,
  // });
  const { password, userName, type } = params;
  if (password === '1235' && userName === 'rtc') {
    return {
      status: 'ok',
      type,
      currentAuthority: 'user',
    };
  }
  // if (password === 'ant.design' && userName === 'user') {
  //   res.send({
  //     status: 'ok',
  //     type,
  //     currentAuthority: 'user',
  //   });
  //   return;
  // }
  return {
    status: 'error',
    type,
    currentAuthority: 'guest',
  };
}
export async function fakeLawyerLogin(params) {
  const { password, userName, type } = params;
  if (password === '1235' && userName === 'lawyer') {
    return {
      status: 'ok',
      type,
      currentAuthority: 'lawyer',
    };
  }
  // if (password === 'ant.design' && userName === 'user') {
  //   res.send({
  //     status: 'ok',
  //     type,
  //     currentAuthority: 'user',
  //   });
  //   return;
  // }
  return {
    status: 'error',
    type,
    currentAuthority: 'guest',
  };
}
export async function fakeRegister(params) {
  // return request('/api/register', {
  //   method: 'POST',
  //   data: params,
  // });
  return { status: 'ok', currentAuthority: 'user' };
}
export async function fakeLawyerRegister(params) {
  // return request('/api/register', {
  //   method: 'POST',
  //   data: params,
  // });
  return { status: 'ok', currentAuthority: 'lawyer' };
}
export async function queryNotices(params = {}) {
  // return request(`/api/notices?${stringify(params)}`);
  return [
    {
      id: '000000001',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: 'blasstgfx delivered your order.',
      datetime: '2017-08-09',
      type: 'notification',
    },
    {
      id: '000000002',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
      title: 'Your profile image was removed since it might not be original.',
      datetime: '2017-08-08',
      type: 'notification',
    },
    {
      id: '000000003',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
      title: 'blasstgfx delivered your order.',
      datetime: '2017-08-07',
      read: true,
      type: 'notification',
    },
    {
      id: '000000004',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
      title: 'Your profile image was removed since it might not be original.',
      datetime: '2017-08-07',
      type: 'notification',
    },
    {
      id: '000000006',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: 'Love dddddd',
      description: 'hello. ',
      datetime: '2017-08-07',
      type: 'message',
      clickClose: true,
    },
    {
      id: '000000007',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: 'Sara Reply you',
      description: 'kdkoljll ldfllk;lsdf ffdsdfds',
      datetime: '2017-08-07',
      type: 'message',
      clickClose: true,
    },
    {
      id: '000000008',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: 'yes',
      description: 'kdkoljll ldfllk;lsdf ffdsdfds',
      datetime: '2017-08-07',
      type: 'message',
      clickClose: true,
    },
    // {
    //   id: '000000009',
    //   title: '任务名称',
    //   description: '任务需要在 2017-01-12 20:00 前启动',
    //   extra: '未开始',
    //   status: 'todo',
    //   type: 'event',
    // },
    // {
    //   id: '000000010',
    //   title: '第三方紧急代码变更',
    //   description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
    //   extra: '马上到期',
    //   status: 'urgent',
    //   type: 'event',
    // },
    // {
    //   id: '000000011',
    //   title: '信息安全考试',
    //   description: '指派竹尔于 2017-01-09 前完成更新并发布',
    //   extra: '已耗时 8 天',
    //   status: 'doing',
    //   type: 'event',
    // },
    // {
    //   id: '000000012',
    //   title: 'ABCD 版本发布',
    //   description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
    //   extra: '进行中',
    //   status: 'processing',
    //   type: 'event',
    // },
  ];
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

export async function apiPost(url, params) {
  const postData = {
    postContent: JSON.stringify(params),
  };
  return request(`/api${url}`, {
    method: 'POST',
    data: postData,
  });
}

export async function apiPut(url, params) {
  const postData = {
    postContent: JSON.stringify(params),
  };
  // console.log('params',postData);
  return request(`/api${url}`, {
    method: 'PUT',
    data: postData,
  });
}

export async function apiDelete(url, params) {
  const postData = {
    postContent: JSON.stringify(params),
  };
  // console.log('params',postData);
  return request(`/api${url}`, {
    method: 'DELETE',
    data: postData,
  });
}

export async function apiGet(url, params) {
  // console.log(url, params)
  const queryData = {
    queryContent: JSON.stringify(params),
  };
  // console.log('params',queryData);

  return request(`/api${url}?${stringify(queryData)}`);
}

export async function apiUpload(url, params) {
  // console.log('params',postData);
  return request(`/api${url}`, {
    method: 'POST',
    data: params,
  });
}


//sunny 20200109 TS54 message error bug fixes(add param)
//export function parseResSubmit(response) {
export function parseResSubmit(response, inShowError = false) {
  console.log('1response', response);
  if (response) {
    if (response.status === 0) {
      const data = { ...response.data };
      return data;
      // return response.data;
    }

    // sunny 20200106 TS54 dont show client the error code
    // message.error(response.info);
    if (!inShowError) {
      message.error(response.info);
    }


  }
  return null;
}

export function parseResDetail(response) {
  console.log('2response', response);
  if (response && response.status === 0) {
    return response.data;
  }
  return null;
}

export function parseResList(response, page) {
  console.log('3response', response);
  if (response) {
    if (response.status === 0) {
      const result = {
        list: response.data,
        pagination: {
          ...page,
          total: response.total,
        },
        info: response.info,
        // 20200303 wiley
        ext: response.ext,
      };
      // console.log(result)
      return result;
    }
    message.error(response.info);
  }
  return null;
}
