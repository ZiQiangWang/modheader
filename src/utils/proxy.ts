import { getStorageHeaders } from './helper';

class MyXMLHttpRequest extends window.XMLHttpRequest {
  public send(body?: Document | BodyInit | null) {
    const headers = getStorageHeaders();
    Object.keys(headers).forEach((key) => {
      super.setRequestHeader(key, headers[key]);
    });

    super.send(body);
  }
}

function proxyFetch(input: RequestInfo, init?: RequestInit) {
  const headers = getStorageHeaders();

  const reqHeaders = Object.assign({}, init ? init.headers : {}, headers);

  const req = Object.assign({}, init || {}, { headers: reqHeaders });
  return window.fetch(input, req);
}
export default function proxy() {
  window.XMLHttpRequest = MyXMLHttpRequest;
  window.fetch = proxyFetch;
}
