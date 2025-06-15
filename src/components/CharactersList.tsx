import { useBaseContext } from "../store/use-base-context";
import { AppAction, AppState } from "../store/StateReducer";
import { Attribute } from "./Attribute";
import { ClassList } from "./ClassList";
import { Skills } from "./Skills";
import { SkillCheck } from "./SkillCheck";
import { CharacterActions } from "./CharacterActions";
import { SkillCheckResults } from "./SkillCheckResults";
import { PartySkillCheckResults } from "./PartySkillCheckResults";
import { PartySkillCheck } from "./PartySkillCheck";
import { useEffect } from "react";

export const CharactersList = () => {
   const { state, dispatch } = useBaseContext<
    AppState,
    AppAction
  >();

  useEffect(() => {
    const fetchData = async () => {
      dispatch({type: 'SET_LOADING', payload: true})
      const res = await fetch(process.env.REACT_APP_API_URL);
      if (res.ok) {
        const {body} = await res.json();        
        dispatch({type: 'SET_CHARACTERS', payload: body})
      } else {
        alert('There was a problem fetching data!!')
      }
    }
    fetchData();
  }, []);

  const {characters} = state;

    return <div style={{display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px'}}>
                    <CharacterActions/>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                      <div style={{width: '50%'}}>
                        <SkillCheckResults/>
                      </div>
                      <div style={{width: '50%'}}>
                        <PartySkillCheckResults/>
                      </div>
                    </div>
                    {characters.length > 0 && <PartySkillCheck/>}
                    {characters.map(character => {
                        return (
                          <div key={character.name} style={{display: 'flex', flexDirection: 'column', gap: '16px', padding: '40px', border: '1px solid white'}}>
                            <h2>{character.name}</h2>
                            <SkillCheck character={character}/>
                            <div style={{display: 'flex', gap: '16px'}}>
                              <div style={{width: '35%', border: '1px solid white', padding: '16px'}}>
                                <h4>Attributes</h4>
                                <Attribute character={character}/>
                              </div>
                              <div style={{width: '20%', border: '1px solid white', padding: '16px'}}>
                                <h4>Classes</h4>
                                <ClassList/>
                              </div>
                              <div style={{width: '45%', border: '1px solid white', padding: '16px'}}>
                                <h4>Skills</h4>
                                <Skills character={character}/>
                              </div>
                            </div>
                          </div>
                        )
                    })}
        </div>
}