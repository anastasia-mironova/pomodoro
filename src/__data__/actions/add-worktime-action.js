const workTimeAction = (minutes) => ({
  type: 'WORK_TIME_CHANGE',
  payload: minutes,
});
export default workTimeAction;
