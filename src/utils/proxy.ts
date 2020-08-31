import { getCurrentStorageHeaders } from './helper';

class MyXMLHttpRequest extends window.XMLHttpRequest {
  public send(body?: Document | BodyInit | null) {
    const headers = getCurrentStorageHeaders();
    Object.keys(headers).forEach((key) => {
      super.setRequestHeader(key, headers[key]);
    });

    super.send(body);
  }
}

export default function proxy() {
  window.XMLHttpRequest = MyXMLHttpRequest;
  const oldFetch = window.fetch;

  window.fetch = (input: RequestInfo, init?: RequestInit) => {
    const headers = getCurrentStorageHeaders();

    const reqHeaders = Object.assign({}, init ? init.headers : {}, headers);

    const req = Object.assign({}, init || {}, { headers: reqHeaders });
    return oldFetch(input, req);
  };
}
