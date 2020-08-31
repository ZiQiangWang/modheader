import React, { useMemo, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { HalfPixelBorderBottom, HalfPixelBorder } from '../components/Border';

const TabsContainer = styled(HalfPixelBorderBottom)`
  display: flex;
  flex-wrap: wrap;
  border: none;
  position: relative;
`;

const TabItem = styled(HalfPixelBorder)<{ selected?: boolean }>`
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  margin: 10px;
  background-color: ${(props) => (props.selected ? 'orange' : 'white')};

  ${(props) =>
    props.selected &&
    css`
      color: white;
      &::before {
        display: none;
      }
    `}
`;

interface Props {
  current: number;
  count: number;
  onChange: (index: number) => void;
  onCreate: () => void;
}
export default function Tabs({ current, count, onChange, onCreate }: Props) {
  const lst = useMemo(() => {
    const data: number[] = [];
    for (let index = 0; index < count; index++) {
      data.push(index);
    }
    return data;
  }, [count]);

  const onClick = useCallback(
    (index: number) => {
      onChange(index);
    },
    [onChange]
  );

  return (
    <TabsContainer borderColor="#dddddd">
      {lst.map((item) => (
        <TabItem
          key={item}
          selected={current === item}
          onClick={() => onClick(item)}
          borderRadius={16}
          borderColor="#dddddd"
        >
          {item + 1}
        </TabItem>
      ))}
      <TabItem borderRadius={16} borderColor="#dddddd" onClick={onCreate}>
        +
      </TabItem>
    </TabsContainer>
  );
}
