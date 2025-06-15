import { useState } from "react";
import { SKILL_LIST } from "../consts";
import { AppAction, AppState } from "../store/StateReducer";
import { useBaseContext } from "../store/use-base-context";
import { Character } from "../types";

export const PartySkillCheck = () => {
    const { state, dispatch } = useBaseContext<
    AppState,
    AppAction
  >();

  const [dc, setDc] = useState<number>(0);

  const calcTotalSkillForCharacter = (character: Character) => {
    const { attributes, skills } = character;
    return skills.reduce((a, b) => {
        const foundAttribute = attributes.find(attr => attr.attribute === b.attributeModifier);
        if (foundAttribute) {
            return a + foundAttribute.modifier + b.value;
        }
        return a;
    }, 0)
  }

  const getCharacterWithHighestTotalSkills = () => {
    const {characters} = state;
    let tempCharacter = characters[0];
    for (const character of characters) {
        const totalSkill = calcTotalSkillForCharacter(character);
        const totalSkillForTemp = calcTotalSkillForCharacter(tempCharacter);
        if (totalSkill > totalSkillForTemp) {
            tempCharacter = character;
        }
    }
    return tempCharacter;
  }

  const onRoll = () => {
    if (selectedPartySkill) {
        const {value, attributeModifier} = selectedPartySkill;
        const character = getCharacterWithHighestTotalSkills();
        const {attributes} = character;
        const foundAttribute = attributes.find(attr => attr.attribute === attributeModifier);
        if (foundAttribute) {
            const totalSkill = foundAttribute.modifier + value;
            dispatch({type: 'SET_PARTY_ROLL', payload: {partyRoll: Math.floor(Math.random() * 20) + 1, partyDc: dc, partyTotalSkill: totalSkill, character}})
        }
    }
  }

  const onSkillChange = (skill?: string) => {
    const character = getCharacterWithHighestTotalSkills();
    if (skill) {
        const foundSkill = character.skills.find(s => s.name === skill);                
        if (foundSkill) {
            dispatch({type: 'SET_SELECTED_PARTY_SKILL', payload: {skill: foundSkill, character: character} })
        }
    } else {
         dispatch({type: 'SET_SELECTED_PARTY_SKILL', payload: {character} })
    }
  }

  const {selectedPartySkill} = state;
  
    return (
        <div style={{display: 'flex', flexDirection: 'column', border: '1px solid white', justifyContent: 'center', padding: '32px'}}>
            <h4>Party Skill Check</h4>
            <div style={{display: 'flex', gap: '4px', justifyContent: 'center'}}>
                <div style={{display: 'flex', gap: '2px'}}>
                    <label htmlFor="partySkill">Skill:</label>
                    <select id="partySkill" value={selectedPartySkill?.name ?? undefined} onChange={(e) => onSkillChange(e.target.value)}>
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