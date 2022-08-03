import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { Timer } from './components/Timer';
import { workTimeAction } from './__data__/actions/add-worktime-action';

function App() {
  const stateApp = useSelector((state) => state);
  const dispatch = useDispatch();

  console.log(stateApp);
  return (
    <div className="App">
      <Timer />
      <button onClick={() => dispatch(workTimeAction(stateApp.workTime + 1))}>+ </button>
      <button onClick={() => dispatch(workTimeAction(stateApp.workTime - 1))}>- </button>
      <button onClick={() => dispatch({ type: 'RESET' })}>reset</button>
      <span>{stateApp.workTime}</span>
    </div>
  );
}

export default App;
