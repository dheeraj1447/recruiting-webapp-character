import { AppAction, AppState } from "../store/StateReducer";
import { useBaseContext } from "../store/use-base-context";
import { Character } from "../types";
import { Skill } from "./Skill";

interface SkillsProps {
    character: Character;
}

export const Skills = ({character}: SkillsProps) => {
    const { state } = useBaseContext<
            AppState,
            AppAction
          >();
    
    const {selectedAttribute} = state;

    const totalPoints = selectedAttribute ? 10 + (4 * selectedAttribute.modifier) : 0
          
    return <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
            {totalPoints > 0 ?
            <>
                <div><strong>Total skill points available - {totalPoints}</strong></div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
                    {character.skills.map(skill => (<Skill key={skill.name} totalSkillPointsAvailable={totalPoints} skill={skill} attributes={character.attributes} />))}
                </div>
            </> : 
                <div><strong>Total skill points available - 0</strong></div>
            }
        </div>
}