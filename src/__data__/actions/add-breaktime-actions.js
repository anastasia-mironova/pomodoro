const breakTimeAction = (minutes) => ({
  type: 'BREAK_TIME_CHANGE',
  payload: minutes,
});
export default breakTimeAction;
