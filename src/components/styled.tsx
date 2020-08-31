import styled from 'styled-components';

export const Close = styled.div`
  display: inline-block;
  width: 20px;
  height: 2px;
  background: red;
  transform: rotate(45deg);

  &::after {
    content: '';
    display: block;
    width: 20px;
    height: 2px;
    background: red;
    transform: rotate(-90deg);
  }
`;
