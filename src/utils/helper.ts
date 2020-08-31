import constants from '../constants';
import { isNull } from 'util';
import { HeaderProps } from '../type';

// 获取存储的请求头
export function getCurrentStorageHeaders() {
  const headersMap = getStorageHeadersTotal();
  const selected = getStorageSelected();
  const res: Record<string, string> = {};
  if (selected > -1 && headersMap[selected] && headersMap[selected].enabled) {
    headersMap[selected].data.forEach((item) => {
      if (item.use && item.key) {
        res[item.key] = item.value;
      }
    });
  }
  return res;
}

// 获取存储的请求头
export function getStorageHeadersTotal() {
  const headers = localStorage.getItem(constants.DATA_KEY);
  if (headers) {
    return JSON.parse(headers) as HeaderProps[];
  }
  return [];
}

export function setStorageHeadersTotal(data: HeaderProps[]) {
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
