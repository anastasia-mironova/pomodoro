import styled from '@emotion/styled';
import {css} from '@emotion/react';

export const ButtonStyled = styled.button(({color}) => css`
  height: 30px;
  width: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${color};
  color: aliceblue;
  font-weight: bold;
  border: none;
  border-radius: 3px;
  margin: 15px 0;

  :hover {
    background: royalblue;
  }
`);

export const ButtonGroupWrapper = styled.div(css`
  display: flex;
  width: 100%;

  min-width: 175px;

  align-items: center;
  justify-content: space-between;

  span {
    font-size: 20px;
    margin: 0 5px;
  }
`);
