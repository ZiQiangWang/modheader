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
import { HeaderProps } from '../type';
export default function useStore() {
  // 是否显示面板
  const [visibile, setVisible] = useState(true);

  // 保存全部header的方案
  const [headers, setHeaders] = useState<HeaderProps[]>(() =>
    getStorageHeadersTotal()
  );
  // 保存当前选中的方案
  const [selected, setSelected] = useState(() => getStorageSelected());

  // 触发显示面板
  const toggleVisible = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);
  // 选择tab
  const onTabChange = useCallback((index: number) => {
    setSelected(index);
    setStorageSelected(index);
  }, []);

  // 添加新的header方案
  const addHeader = useCallback(() => {
    setHeaders((prev) => {
      setSelected(prev.length);
      return prev.concat({
        enabled: true,
        data: [],
      });
    });
  }, []);

  const removeHeader = useCallback(() => {
    setHeaders(
      produce((draft: HeaderProps[]) => {
        draft.splice(selected, 1);
      })
    );
    if (selected > 0) {
      setSelected(selected - 1);
    } else if (headers.length > 1) {
      setSelected(0);
    } else {
      setSelected(-1);
    }
  }, [selected, headers]);

  const addHeaderItem = useCallback(() => {
    setHeaders(
      produce((draft: HeaderProps[]) => {
        draft[selected].data.push({ key: '', value: '', use: true });
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
          draft[selected].data[Number(index)][type as 'key' | 'value'] = val;
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
          draft[selected].data = draft[selected].data.filter(
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
          draft[selected].data[index].use = checked;
        })
      );
    },
    [selected]
  );

  const toggleHeaderEnable = useCallback(() => {
    setHeaders(
      produce((draft: HeaderProps[]) => {
        draft[selected].enabled = !draft[selected].enabled;
      })
    );
  }, [selected]);

  const currentHeader = useMemo(() => {
    return headers[selected] || { data: [], enabled: true };
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
    removeHeader,
    currentHeader,
    addHeaderItem,
    headerItemChange,
    removeHeaderItem,
    toggleHeaderItemUse,
    toggleHeaderEnable,
    toggleVisible,
    visibile,
  };
}
