import constants from '../constants';
import { isNull } from 'util';

// 获取存储的请求头
export function getStorageHeaders() {
  const headers = localStorage.getItem(constants.DATA_KEY);
  if (headers) {
    return JSON.parse(headers) as Record<string, any>;
  }
  return {};
}

// 获取存储的请求头
export function getStorageHeadersTotal() {
  const headers = localStorage.getItem(constants.DATA_KEY);
  if (headers) {
    return JSON.parse(headers) as Array<{
      key: string;
      value: string;
      use: boolean;
    }>[];
  }
  return [];
}

export function setStorageHeadersTotal(
  data: Array<{ key: string; value: string; use: boolean }>[]
) {
  localStorage.setItem(constants.DATA_KEY, JSON.stringify(data));
}

// 获取方案
export function getStorageSelected() {
  const selected = localStorage.getItem(constants.SELECTED);
  return isNull(selected) ? -1 : Number(selected);
}

// 保存方案
export function setStorageSelected(index: number) {
  localStorage.setItem(constants.SELECTED, String(index));
}

// 加载js文件
export function loadJavaScript(url: string) {
  return new Promise((resolve, reject) => {
    const head = document.getElementsByTagName('head').item(0);
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', url);
    if (head) {
      head.appendChild(script);
      script.onload = resolve;
      script.onerror = reject;
    } else {
      reject();
    }
  });
}
