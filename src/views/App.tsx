import React from 'react';
import styled from 'styled-components';
import Store from '../store';
import Tabs from './Tabs';
import Headers from './Headers';
import { Icon } from '../components/styled';
import Float from '../components/Float';
import Bar from './Bar';

const Container = styled.div`
  height: 240px;
  overflow-x: hidden;
  position: fixed;
  z-index: 999998;
  bottom: 0;
  left: 0;
  width: 100%;
  box-shadow: 0px 1px 5px 2px lightgrey; ;
`;

function App() {
  const store = Store.useContainer();
  return (
    <>
      <Float>
        <Icon onClick={store.toggleVisible} />
      </Float>
      {store.visibile && (
        <Container>
          <Tabs
            count={store.headers.length}
            current={store.selected}
            onChange={store.onTabChange}
            onCreate={store.addHeader}
          />
          <Bar />
          <Headers />
        </Container>
      )}
    </>
  );
}

export default App;
