/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';
import globalData, { serverUrl } from './globalData';
import {RangeRequestsPlugin} from 'workbox-range-requests';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';


const sw = '20210131_v1';

clientsClaim();

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA

//会将src下的文件js, css， 图片等进行预缓存
precacheAndRoute(self.__WB_MANIFEST);

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }) => {
    console.log(request);
    console.log(url);
    console.log(process);
    // If this isn't a navigation, skip.
    if (request.mode !== 'navigate') {
      return false;
    } // If this is a URL that starts with /_, skip.

    if (url.pathname.startsWith('/_')) {
      return false;
    } // If this looks like a URL for a resource, because it contains // a file extension, skip.

    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    } // Return true to signal that we want to use the handler.

    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

// An example runtime caching route for requests that aren't handled by the
// precache, in this case same-origin .png requests like those from in public/
registerRoute(
  // Add in any other file extensions or routing criteria as needed.
  // 缓存图片
   /.*.(?:png|jpeg|jpg|svg)$/,
  // ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'), // Customize this strategy as needed, e.g., by changing to CacheFirst.
  new StaleWhileRevalidate({
    cacheName: 'cache-images',
    plugins: [
      // Ensure that once this runtime cache reaches a maximum size the
      // least-recently used images are removed.
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);


//sme related route default "get"
const smeMatchCb  = ({request, url}) => {
    console.log(request)
    console.log(url)
    if(url.href.startsWith(`${serverUrl}/api/sme`)){
      return true;
    }
    return false;
}

registerRoute(
  smeMatchCb,
  // ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'), // Customize this strategy as needed, e.g., by changing to CacheFirst.
  new NetworkFirst({
    cacheName: 'cache-orders',
    plugins: [
      // Ensure that once this runtime cache reaches a maximum size the
      // least-recently used images are removed.
      new ExpirationPlugin({ 
        maxEntries: 50,
        maxAgeSeconds: 60 
      }),
      new CacheableResponsePlugin({statuses: [200]})
    ],
  })
);

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
// 如果不skip_waiting 的话，旧的service worker 在生效，新的未激活。 如果直接skipwaiting, 
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
    clientsClaim();
  }
});

// Any other custom service worker logic can go here.



// 监听 push 事件
let times = 0 
self.addEventListener('push', function (e) {
  if (!e.data) {
    return
  }
  // 解析获取推送消息
  console.log(e.data);
  const text = e.data.text();
  let payload = e.data.json();
  console.log(text);
  console.log(payload);
  // 根据推送消息生成桌面通知并展现出来
  let promise = self.registration.showNotification(payload.title, {
    body: payload.body,
    // icon: payload.icon,
    data: {
      url: payload.url
    }
  })
  times = times +1;
  console.log(times);
  e.waitUntil(promise)
})

// 监听通知点击事件
self.addEventListener('notificationclick', function (e) {
  // 关闭窗口
  console.log(e);
  e.notification.close()
  // 打开网页
  e.waitUntil(self.clients.openWindow(e.notification.data.url))
})
