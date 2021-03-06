import React from 'react';
import styled, { css } from 'styled-components';
import Store from '../store';
import { Close } from '../components/styled';
import Checkbox from '../components/Checkbox';
import { HalfPixelBorder } from '../components/Border';
import constants from '../constants';

const HeadersContainer = styled.div<{ disabled: boolean }>`
  padding: 10px;
  position: relative;
  ${(props) =>
    props.disabled &&
    css`
      &::after {
        content: '';
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      * {
        filter: grayscale();
      }
    `}
`;

const HeaderLine = styled.div`
  display: flex;
  align-content: stretch;
  align-items: center;
  margin-bottom: 10px;
`;

const InputWrapper = styled(HalfPixelBorder)`
  flex: 1;
  margin-right: 10px;
  position: relative;
  height: 32px;
`;
const Input = styled.input`
  outline: none;
  border: none;
  padding: 0;
  position: absolute;
  padding: 0 4px;
  left: 1px;
  top: 1px;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  box-sizing: border-box;
  display: block;
`;

export default function Headers() {
  const store = Store.useContainer();
  return (
    <HeadersContainer disabled={!store.currentHeader.enabled}>
      {store.currentHeader.data.map((item, index) => (
        <HeaderLine key={index}>
          <Checkbox
            value={item.use}
            index={index}
            onChange={store.toggleHeaderItemUse}
          />
          <InputWrapper borderColor={constants.BORDER_COLOR}>
            <Input
              value={item.key}
              onChange={store.headerItemChange}
              data-index={index}
              data-type="key"
            />
          </InputWrapper>
          <InputWrapper borderColor={constants.BORDER_COLOR}>
            <Input
              value={item.value}
              onChange={store.headerItemChange}
              data-index={index}
              data-type="value"
            />
          </InputWrapper>

          <Close onClick={store.removeHeaderItem} data-index={index} />
        </HeaderLine>
      ))}
    </HeadersContainer>
  );
}
