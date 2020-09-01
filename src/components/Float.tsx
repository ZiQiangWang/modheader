import React, {
  PropsWithChildren,
  useRef,
  useCallback,
  TouchEvent,
  useEffect,
} from 'react';
import styled from 'styled-components';

const Float = styled.span`
  display: inline-block;
  position: fixed;
  z-index: 999999;
  top: 0;
  left: 0;
  &.mod-header-float {
    transition: transform 0.2s ease;
  }
`;

export default function Floater({ children }: PropsWithChildren<{}>) {
  const ref = useRef<HTMLSpanElement>(null);
  const data = useRef<{
    posX: number;
    posY: number;
    nowX: number;
    nowY: number;
    distanceX: number;
    distanceY: number;
    touching: boolean;
    windowWidth: number;
    windowHeight: number;
  }>({
    posX: 0,
    posY: 0,
    nowX: 0,
    nowY: 0,
    distanceX: document.documentElement.clientWidth,
    distanceY: document.documentElement.clientHeight,
    touching: false,
    windowWidth: document.documentElement.clientWidth,
    windowHeight: document.documentElement.clientHeight,
  });

  const fnTranslate = useCallback((x: number, y: number) => {
    x = Math.round(1000 * x) / 1000;
    y = Math.round(1000 * y) / 1000;
    if (ref.current) {
      ref.current.style.webkitTransform =
        'translate(' + [x + 'px', y + 'px'].join(',') + ')';
      ref.current.style.transform =
        'translate3d(' + [x + 'px', y + 'px', 0].join(',') + ')';
    }
  }, []);

  useEffect(() => {
    const { windowWidth, windowHeight } = data.current;
    data.current.distanceX = windowWidth - (ref.current?.clientWidth || 0);
    data.current.distanceY =
      windowHeight - (ref.current?.clientHeight || 0) - 160;
    ref.current?.classList.remove('mod-header-float');
    fnTranslate(data.current.distanceX, data.current.distanceY);
  }, [fnTranslate, ref]);

  const start = useCallback((e: TouchEvent<HTMLSpanElement>) => {
    const events = e.touches[0] || e;

    data.current.posX = events.clientX;
    data.current.posY = events.clientY;
    data.current.nowX = events.clientX;
    data.current.nowY = events.clientY;
    data.current.touching = true;

    ref.current?.classList.remove('mod-header-float');
  }, []);

  const move = useCallback(
    (e: TouchEvent<HTMLSpanElement>) => {
      const events = e.touches[0] || e;

      data.current.nowX = events.clientX;
      data.current.nowY = events.clientY;

      const distanceX = data.current.nowX - data.current.posX;
      const distanceY = data.current.nowY - data.current.posY;

      data.current.posX = data.current.nowX;
      data.current.posY = data.current.nowY;

      const x = data.current.distanceX + distanceX;
      const y = data.current.distanceY + distanceY;
      fnTranslate(x, y);
      data.current.distanceX = x;
      data.current.distanceY = y;
    },
    [fnTranslate]
  );

  const end = useCallback(
    (e: TouchEvent<HTMLSpanElement>) => {
      const { touching, nowX, windowWidth, distanceY } = data.current;
      if (touching === false) {
        // fix iOS fixed bug
        return;
      }
      data.current.touching = false;
      ref.current?.classList.add('mod-header-float');
      const targetWidth = ref.current?.clientWidth || 0;
      if (nowX > windowWidth / 2) {
        data.current.posX = windowWidth - (targetWidth || 0);
      } else {
        data.current.posX = 0;
      }
      data.current.distanceX = data.current.posX;
      fnTranslate(data.current.posX, distanceY);
    },
    [fnTranslate]
  );

  return (
    <Float ref={ref} onTouchStart={start} onTouchEnd={end} onTouchMove={move}>
      {children}
    </Float>
  );
}
