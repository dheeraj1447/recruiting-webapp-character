import { AppAction, AppState } from "../store/StateReducer";
import { useBaseContext } from "../store/use-base-context";

export const PartySkillCheckResults = () => {
    const { state } = useBaseContext<
        AppState,
        AppAction
      >();
    
    const {selectedCharacter, selectedPartySkill, partyRoll, partyDc, totalPartySkill} = state;
    
      
    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <h3>Party Skill Check Results</h3>
            {partyRoll > 0 ?
                <>
                    <p>{selectedCharacter?.name}</p>
                    <p>Skill: {selectedPartySkill?.name}:{totalPartySkill}</p>
                    <p>You Rolled: {partyRoll}</p>
                    <p>The DC was: {partyDc}</p>
                    <p>Result: {totalPartySkill + partyRoll >= partyDc ? <span style={{color: 'green'}}><strong>Successful</strong></span> : <span style={{color: 'red'}}><strong>Failure</strong></span>}</p>
                </> : <p style={{color: 'yellow'}}>Roll to see results</p>}
        </div>
    );
}