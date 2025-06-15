import { CHARACTER_VALUE_THRESHOLD, MODIFIER_THRESHOLD } from "../consts";
import { AppAction, AppState } from "../store/StateReducer";
import { useBaseContext } from "../store/use-base-context";
import { Attributes, Character } from "../types";

interface AttributeProps {
    character: Character;
}

export const Attribute = ({character}: AttributeProps) => {
    const {attributes, name} = character;

    const { dispatch } = useBaseContext<
        AppState,
        AppAction
      >();

    const onIncrement = (attribute: keyof Attributes, currentValue: number) => {
    const totalCharacterPoints = attributes.reduce((a, b) => (a + b.value), 0)
    if (totalCharacterPoints < CHARACTER_VALUE_THRESHOLD) {
      const incrementValue = currentValue + 1;
      const diff = incrementValue - MODIFIER_THRESHOLD;
      dispatch({type: 'UPDATE_CHARACTER', payload: {characterName: name, attribute, value: incrementValue, modifier: Math.floor(diff / 2)}})
    } else {
      alert('Decrease a character value before you can increase!')
    }
  }

  const onDecrement = (attribute: keyof Attributes, currentValue: number) => {
    const decrementValue = currentValue - 1;
    const diff = decrementValue - MODIFIER_THRESHOLD;
    dispatch({type: 'UPDATE_CHARACTER', payload: {characterName: name, attribute, value: decrementValue, modifier: Math.floor(diff / 2)}})
  }

    return (
      <>
        {attributes.map(attribute => (
          <div key={attribute.attribute} style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
              <p>{attribute.attribute}: {attribute.value}(Modifier: {attribute.modifier})</p>
              <div style={{display: 'flex', textAlign: 'center'}}>
                  <button onClick={() => onIncrement(attribute.attribute, attribute.value)}>+</button>
                  <button onClick={() => onDecrement(attribute.attribute, attribute.value)}>-</button>
              </div>
          </div>
        ))}
      </>
    );
}