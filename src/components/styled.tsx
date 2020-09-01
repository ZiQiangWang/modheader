import styled from 'styled-components';
import Smile from '../assets/smile.png';

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

export const Icon = styled.div`
  width: 40px;
  height: 40px;
  background: url(${Smile}) no-repeat center / contain;
`;
