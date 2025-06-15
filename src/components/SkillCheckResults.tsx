import { AppAction, AppState } from "../store/StateReducer";
import { useBaseContext } from "../store/use-base-context";

export const SkillCheckResults = () => {
    const { state } = useBaseContext<
        AppState,
        AppAction
      >();
    
    const {selectedCharacter, selectedSkill, roll, dc, totalSkill} = state;
    
      
    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <h3>Skill Check Results</h3>
            {roll > 0 ? 
                <>
                    <p>{selectedCharacter?.name}</p>
                    <p>Skill: {selectedSkill?.name}:{totalSkill}</p>
                    <p>You Rolled: {roll}</p>
                    <p>The DC was: {dc}</p>
                    <p>Result: {totalSkill + roll >= dc ? <span style={{color: 'green'}}><strong>Successful</strong></span> : <span style={{color: 'red'}}><strong>Failure</strong></span>}</p>
                </> : <p style={{color: 'yellow'}}>Roll to see results</p>}
        </div>
    );
}