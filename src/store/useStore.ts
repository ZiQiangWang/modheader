import {
  useState,
  useCallback,
  useMemo,
  useEffect,
  ChangeEvent,
  MouseEvent,
} from 'react';
import produce from 'immer';
import {
  getStorageSelected,
  setStorageSelected,
  getStorageHeadersTotal,
  setStorageHeadersTotal,
} from '../utils/helper';

export type HeaderProps = Array<{ key: string; value: string; use: boolean }>;

export default function useStore() {
  // 保存全部header的方案
  const [headers, setHeaders] = useState<HeaderProps[]>(() =>
    getStorageHeadersTotal()
  );
  // 保存当前选中的方案
  const [selected, setSelected] = useState(() => getStorageSelected());

  // 选择tab
  const onTabChange = useCallback((index: number) => {
    setSelected(index);
    setStorageSelected(index);
  }, []);

  // 添加新的header方案
  const addHeader = useCallback(() => {
    setHeaders((prev) => {
      setSelected(prev.length);
      return prev.concat([[]]);
    });
  }, []);

  const addHeaderItem = useCallback(() => {
    setHeaders(
      produce((draft) => {
        draft[selected].push({ key: '', value: '', use: true });
      })
    );
  }, [selected]);

  const headerItemChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      const { index, type } = e.target.dataset;
      if (index === undefined || type === undefined) {
        return;
      }
      setHeaders(
        produce((draft: HeaderProps[]) => {
          draft[selected][Number(index)][type as 'key' | 'value'] = val;
        })
      );
    },
    [selected]
  );

  const removeHeaderItem = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const { index } = e.currentTarget.dataset;
      if (index === undefined) {
        return;
      }
      setHeaders(
        produce((draft: HeaderProps[]) => {
          draft[selected] = draft[selected].filter(
            (_item, i) => i !== Number(index)
          );
        })
      );
    },
    [selected]
  );

  const toggleHeaderItemUse = useCallback(
    (checked: boolean, index: number) => {
      setHeaders(
        produce((draft: HeaderProps[]) => {
          draft[selected][index].use = checked;
        })
      );
    },
    [selected]
  );

  const currentHeader = useMemo(() => {
    return headers[selected] || [];
  }, [headers, selected]);

  useEffect(() => {
    setStorageHeadersTotal(headers);
  }, [headers]);

  useEffect(() => {
    setStorageSelected(selected);
  }, [selected]);

  return {
    headers,
    setHeaders,
    selected,
    setSelected,
    onTabChange,
    addHeader,
    currentHeader,
    addHeaderItem,
    headerItemChange,
    removeHeaderItem,
    toggleHeaderItemUse,
  };
}
