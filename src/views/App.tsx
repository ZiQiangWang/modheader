import React from 'react';
import Store from '../store';
import Tabs from './Tabs';
import Headers from './Headers';
import styled from 'styled-components';

const Container = styled.div``;
function App() {
  const store = Store.useContainer();

  return (
    <Container className="App">
      <Tabs
        count={store.headers.length}
        current={store.selected}
        onChange={store.onTabChange}
        onCreate={store.addHeader}
      />
      <Headers data={store.currentHeader} />
    </Container>
  );
}

export default App;
