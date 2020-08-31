import React, { ChangeEvent, useCallback } from 'react';
import styled, { css } from 'styled-components';

const Input = styled.input`
  display: none;
`;

const Label = styled.label<{ checked: boolean }>`
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 1px solid orange;
  position: relative;
  cursor: pointer;
  outline: none;
  margin-right: 10px;

  &::before {
    display: inline-block;
    content: '';
    width: 12px;
    border: 2px solid #fff;
    height: 5px;
    border-top: none;
    border-right: none;
    transform: rotate(-45deg);
    top: 7px;
    left: 4px;
    position: absolute;
    opacity: 0;
  }

  ${(props) =>
    props.checked &&
    css`
      background: orange;
      &::before {
        opacity: 1;
        transform: all 0.5s;
      }
    `}
`;

interface Props {
  index: number;
  value: boolean;
  onChange: (checked: boolean, index: number) => void;
}
export default function Checkbox({ index, value = false, onChange }: Props) {
  const toggleCheck = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.checked, index);
    },
    [index, onChange]
  );
  return (
    <Label checked={value}>
      <Input type="checkbox" checked={value} onChange={toggleCheck} />
    </Label>
  );
}
