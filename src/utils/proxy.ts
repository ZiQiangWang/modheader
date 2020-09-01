import { getCurrentStorageHeaders } from './helper';

function proxyAjax(send: any) {
  XMLHttpRequest.prototype.send = function () {
    const headers = getCurrentStorageHeaders();
    Object.keys(headers).forEach((key) => {
      this.setRequestHeader(key, headers[key]);
    });
    send.apply(this, arguments);
  };
}

function proxyFetch(oldFetch: any) {
  window.fetch = (input: RequestInfo, init?: RequestInit) => {
    const headers = getCurrentStorageHeaders();

    const reqHeaders = Object.assign({}, init ? init.headers : {}, headers);

    const req = Object.assign({}, init || {}, { headers: reqHeaders });
    return oldFetch(input, req);
  };
}
export default function proxy() {
  // proxy ajax
  proxyAjax(XMLHttpRequest.prototype.send);

  // proxy fetch
  proxyFetch(window.fetch);
}
