import { AppAction, AppState } from "../store/StateReducer";
import { useBaseContext } from "../store/use-base-context";
import { AttributeState, SkillState } from "../types";

interface SkillsProps {
    totalSkillPointsAvailable: number;
    skill: SkillState;
    attributes: AttributeState[];
}

export const Skill = ({skill, totalSkillPointsAvailable, attributes}: SkillsProps) => {
    const { state, dispatch } = useBaseContext<
        AppState,
        AppAction
      >();
    
    const {selectedCharacter} = state;

    const foundAttribute = attributes.find(attr => attr.attribute === skill.attributeModifier);

    const onIncrement = (skill: string, currentValue: number) => {
        const {skills, name} = selectedCharacter;
        const currentSkillPoints = skills.reduce((a,b) => (a + b.value), 0)
        if (currentSkillPoints < totalSkillPointsAvailable) {
            dispatch({type: 'UPDATE_SKILL', payload: {characterName: name, skill, value: currentValue + 1}})
        } else {
            alert('No skill points to spend!!')
        }
    }

    const onDecrement = (skill: string, currentValue: number) => {
        if (currentValue === 0) {
            alert('Cannot be decremented further!!!')
            return;
        }
        const {name} = selectedCharacter;
        dispatch({type: 'UPDATE_SKILL', payload: {characterName: name, skill, value: currentValue - 1}})
    }

    return (
        <div style={{display: 'flex', gap: '4px'}}>
            <p>{skill.name}: {skill.value}(Modifier: {skill.attributeModifier}): {foundAttribute.modifier}</p>
            <button onClick={() => onIncrement(skill.name, skill.value)}>+</button>
            <button onClick={() => onDecrement(skill.name, skill.value)}>-</button>
            <p>Total: {skill.value + foundAttribute.modifier}</p>
        </div>
    );
}