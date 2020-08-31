import React from 'react';
import styled from 'styled-components';
import { HalfPixelBorderBottom } from '../components/Border';
import Store from '../store';
import Add from '../assets/add.png';
import Stop from '../assets/stop.png';
import Success from '../assets/success.png';
import Ashbin from '../assets/ashbin.png';

const BarContainer = styled(HalfPixelBorderBottom)`
  height: 40px;
  padding: 0 10px;
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;
export default function Bar() {
  const store = Store.useContainer();
  return store.headers.length > 0 ? (
    <BarContainer borderColor="#dddddd">
      <Image src={Add} onClick={store.addHeaderItem} />
      <Image
        src={store.currentHeader.enabled ? Success : Stop}
        onClick={store.toggleHeaderEnable}
      />
      <Image src={Ashbin} onClick={store.removeHeader} />
    </BarContainer>
  ) : null;
}
