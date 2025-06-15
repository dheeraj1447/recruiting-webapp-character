import './App.css';
import { CharactersList } from './components/CharactersList';
import { BaseContextProvider } from './store/BaseContextProvider';
import { AppAction, appReducer, AppState } from './store/StateReducer';


function App() {
  return (
    <BaseContextProvider<AppState, AppAction>
      initialState={{
        characters: [],
        loading: false,
        roll: 0,
        partyRoll: 0,
        dc: 0,
        partyDc: 0,
        totalSkill: 0,
        totalPartySkill: 0
      }}
      reducer={appReducer}
    >
      <div className="App">
        <header className="App-header">
          <h1>React Coding Exercise</h1>
        </header>
        <section className="App-section">
            <CharactersList/>
        </section>
      </div>
    </BaseContextProvider>
  );
}

export default App;
