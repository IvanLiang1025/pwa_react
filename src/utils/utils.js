export function str2b64(str) {
  // return window.btoa(unescape(encodeURIComponent(str)));
  // ivan 20201019
  return window.btoa(encodeURIComponent(str));
}

// sunny 20200505 save cookie
export function setCrossSubdomainCookie(name, value, days) {
  const assign = `${name}=${escape(value)};`;
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${d.toUTCString()};`;
  const path = "path=/;";
  let domain = '';
  // localhost test

  if (document.domain !== 'localhost') {
    domain = `domain=${document.domain.match(/[^\.]*\.[^.]*$/)[0]};`;
  }

  document.cookie = assign + expires + path + domain;
}

export function getLocalTimeOffset() {
  const date2 = new Date();
  return date2.getTimezoneOffset();
}


export function encodePass(pass) {
  const p = window.btoa(`@#098#%*&%12${pass}`);
  return `y${p}L`;
}