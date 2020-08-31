import React from 'react';
import styled from 'styled-components';
import Store from '../store';
import { HeaderProps } from '../store/useStore';
import { Close } from '../components/styled';
import Checkbox from '../components/Checkbox';
import { HalfPixelBorder } from '../components/Border';

const HeadersContainer = styled.div`
  padding: 10px;
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

const Button = styled(HalfPixelBorder.withComponent('button'))`
  height: 44px;
  line-height: 44px;
  text-align: center;
  width: 100%;
  outline: none;
  background: white;
  font-size: 16px;
`;

interface Props {
  data: HeaderProps;
}
export default function Headers({ data }: Props) {
  const store = Store.useContainer();
  return (
    <HeadersContainer>
      {data.map((item, index) => (
        <HeaderLine key={index}>
          <Checkbox
            value={item.use}
            index={index}
            onChange={store.toggleHeaderItemUse}
          />
          <InputWrapper borderColor="#dddddd">
            <Input
              value={item.key}
              onChange={store.headerItemChange}
              data-index={index}
              data-type="key"
            />
          </InputWrapper>
          <InputWrapper borderColor="#dddddd">
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

      <Button onClick={store.addHeaderItem} borderColor="#dddddd">
        添加
      </Button>
    </HeadersContainer>
  );
}
