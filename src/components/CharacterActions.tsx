import { AppAction, AppState } from "../store/StateReducer";
import { useBaseContext } from "../store/use-base-context";

export const CharacterActions = () => {
    const { state, dispatch } = useBaseContext<
    AppState,
    AppAction
  >();

  const addNewCharacter = () => {
    const {characters} = state;
    dispatch({type: 'ADD_CHARACTER', payload: `Character ${characters.length + 1}`})
  }

  const resetCharacters = () => {
    dispatch({type: 'RESET_CHARACTERS'})
  }

  const saveCharacters = async () => {
    const {characters} = state;
    const res = await fetch(process.env.REACT_APP_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(characters)
    })
    if (res.ok) {
      alert('Characters saved!')
    } else {
      alert('There was an error processing the request!')
    }
  }

  const {characters} = state;
  
    return (
        <div style={{display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center'}}>
            <button onClick={addNewCharacter}>Add New Character</button>
            <button onClick={resetCharacters}>Reset All Characters</button>
            <button onClick={saveCharacters} disabled={characters.length === 0}>Save All Characters</button>
        </div>
    )
}