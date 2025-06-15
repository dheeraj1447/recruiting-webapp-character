import { useState } from "react";
import { SKILL_LIST } from "../consts";
import { AppAction, AppState } from "../store/StateReducer";
import { useBaseContext } from "../store/use-base-context";
import { Character } from "../types";

interface SkillCheckProps {
    character: Character;
}

export const SkillCheck = ({character}: SkillCheckProps) => {
    const { state, dispatch } = useBaseContext<
    AppState,
    AppAction
  >();

  const [dc, setDc] = useState<number>(0);

  const onRoll = () => {
    if (selectedSkill) {
        const {value, attributeModifier} = selectedSkill;
        const {attributes} = character
        const foundAttribute = attributes.find(attr => attr.attribute === attributeModifier);
        if (foundAttribute) {
            const totalSkill = foundAttribute.modifier + value;
            dispatch({type: 'SET_ROLL', payload: {roll: Math.floor(Math.random() * 20) + 1, dc, totalSkill, character}})
        }
    }
  }

  const onSkillChange = (skill?: string) => {
    const {skills} = character;
    if (skill) {
        const foundSkill = skills.find(s => s.name === skill);                
        if (foundSkill) {
            dispatch({type: 'SET_SELECTED_SKILL', payload: {skill: foundSkill, character: character} })
        }
    } else {
         dispatch({type: 'SET_SELECTED_SKILL', payload: {character} })
    }
  }

  const {selectedSkill} = state;
  
    return (
        <div style={{display: 'flex', flexDirection: 'column', border: '1px solid white', justifyContent: 'center', padding: '32px'}}>
            <h4>Skill Check</h4>
            <div style={{display: 'flex', gap: '4px', justifyContent: 'center'}}>
                <div style={{display: 'flex', gap: '2px'}}>
                    <label htmlFor="skill">Skill:</label>
                    <select id="skill" value={selectedSkill?.name ?? undefined} onChange={(e) => onSkillChange(e.target.value)}>
                        <option value={undefined}>--</option>
                        {SKILL_LIST.map(skill => {
                            return <option key={skill.name} value={skill.name}>{skill.name}</option>
                        })}
                    </select>
                </div>
                <div style={{display: 'flex', gap: '2px'}}>
                    <label htmlFor="dc">DC:</label>
                    <input id="dc" type="number" value={dc} onChange={e => {
                        if (e.target.value) {
                            const newDc = +e.target.value
                            setDc(newDc > 0 ? newDc : 0)
                        }
                    }} />
                </div>
                <div style={{display: 'flex', gap: '2px'}}>
                    <button onClick={onRoll}>Roll</button>
                </div>
            </div>
        </div>
    );
}