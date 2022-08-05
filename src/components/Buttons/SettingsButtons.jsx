import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import workTimeAction from '../../__data__/actions/add-worktime-action';
import breakTimeAction from '../../__data__/actions/add-breaktime-actions';
import { ButtonGroupWrapper, ButtonStyled } from './ButtonStyled';

const ButtonGroupWithLabel = styled.div(css`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 45%;
  padding: 5px;
`);
const Wrapper = styled.div(css`
  display: flex;
`);

function SettingsButtons() {
  const stateApp = useSelector((state) => state);
  const dispatch = useDispatch();
  return (

    <Wrapper>
      <ButtonGroupWithLabel>
        <span id="session-label">Work</span>
        <ButtonGroupWrapper>
          <ButtonStyled
            id="session-increment"
            type="button"
            color="blue"
            onClick={() => (stateApp.workTime < 60
              ? dispatch(workTimeAction(stateApp.workTime + 1)) : null)}
          >
            +
          </ButtonStyled>
          <span id="session-length">{stateApp.workTime}</span>
          <ButtonStyled
            id="session-decrement"
            type="button"
            color="blue"
            onClick={() => (stateApp.workTime > 1
              ? dispatch(workTimeAction(stateApp.workTime - 1)) : null)}
          >
            -
          </ButtonStyled>
        </ButtonGroupWrapper>
      </ButtonGroupWithLabel>
      <ButtonGroupWithLabel>
        <span id="break-label">Break</span>
        <ButtonGroupWrapper>
          <ButtonStyled
            id="break-increment"
            color="green"
            type="button"
            onClick={() => (stateApp.workTime < 60
              ? dispatch(breakTimeAction(stateApp.breakTime + 1)) : null)}
          >
            +
          </ButtonStyled>
          <span id="break-length">{stateApp.breakTime}</span>
          <ButtonStyled
            id="break-decrement"
            color="green"
            type="button"
            onClick={() => (stateApp.breakTime > 1
              ? dispatch(breakTimeAction(stateApp.breakTime - 1)) : null)}
          >
            -
          </ButtonStyled>
        </ButtonGroupWrapper>
      </ButtonGroupWithLabel>
    </Wrapper>
  );
}

export default SettingsButtons;
