import styled from 'styled-components';

export const HalfPixelBorder = styled.div<{
  borderRadius?: number;
  borderColor: string;
}>`
  border: none;
  position: relative;
  border-radius: ${(props) => props.borderRadius || 0}px;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 200%;
    border: 1px solid ${(props) => props.borderColor};
    border-radius: ${(props) => 2 * (props.borderRadius || 0)}px;
    height: 200%;
    transform-origin: left top;
    transform: scale(0.5);
    pointer-events: none; /* 防止点击触发 */
    box-sizing: border-box;
    @media screen and (min-device-pixel-ratio: 3),
      (-webkit-min-device-pixel-ratio: 3) {
      border-radius: ${(props) => 3 * (props.borderRadius || 0)}px;
      width: 300%;
      height: 300%;
      transform: scale(0.3333333);
    }
  }
`;

export const HalfPixelBorderBottom = styled.div<{
  borderColor: string;
}>`
  border: none;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 200%;
    border-bottom: 1px solid ${(props) => props.borderColor};
    height: 0;
    transform-origin: left top;
    transform: scale(0.5);
    pointer-events: none; /* 防止点击触发 */
    box-sizing: border-box;
    @media screen and (min-device-pixel-ratio: 3),
      (-webkit-min-device-pixel-ratio: 3) {
      width: 300%;
      transform: scale(0.3333333);
    }
  }
`;
