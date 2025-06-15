import { ATTRIBUTE_LIST, SKILL_LIST } from "../consts";
import { Attributes, AttributeState, Character, SkillState } from "../types";

export interface AppState {
  loading: boolean;
  characters: Character[];
  selectedCharacter?: Character;
  selectedAttribute?: AttributeState;
  selectedSkill?: SkillState;
  selectedPartySkill?: SkillState;
  dc: number;
  partyDc: number;
  roll: number;
  partyRoll: number;
  totalSkill: number;
  totalPartySkill: number;
}

export type AppAction =
  | { type: 'ADD_CHARACTER'; payload: string }
  | { type: 'RESET_CHARACTERS'; }
  | { type: 'SET_CHARACTERS'; payload: Character[] }
  | { type: 'UPDATE_CHARACTER'; payload: {characterName: string, attribute: keyof Attributes, value: number, modifier: number} }
  | { type: 'UPDATE_SKILL'; payload: {characterName: string, skill: string, value: number} }
  | { type: 'SET_SELECTED_SKILL'; payload: {skill?: SkillState, character: Character} }
  | { type: 'SET_SELECTED_PARTY_SKILL'; payload: {skill?: SkillState, character: Character} }
  | { type: 'SET_ROLL'; payload: {roll: number, dc: number, totalSkill: number, character: Character} }
  | { type: 'SET_PARTY_ROLL'; payload: {partyRoll: number, partyDc: number, partyTotalSkill: number, character: Character} }
  | { type: 'SET_LOADING'; payload: boolean };

export const getInitialQualityState = (): AppState => ({
  loading: false,
  characters: [],
  dc: 0,
  partyDc: 0,
  roll: 0,
  partyRoll: 0,
  totalSkill: 0,
  totalPartySkill: 0
});

export const appReducer = (
  state: AppState,
  action: AppAction
): AppState => {
  switch (action.type) {
    case 'SET_CHARACTERS': {
      const {attributes} = action.payload[0];
      return {...state, characters: action.payload, selectedCharacter: action.payload[0], selectedAttribute: attributes[0], loading: false}
    }
    case 'UPDATE_CHARACTER': {
      const newCharacters = [...state.characters];
      const characterIndex = newCharacters.findIndex(char => char.name === action.payload.characterName);
      if (characterIndex > -1) {
        const character = newCharacters[characterIndex];
        const foundIndex = character.attributes.findIndex(char => char.attribute === action.payload.attribute);
        if (foundIndex > - 1) {
          const attribute = character.attributes[foundIndex];
          attribute.value = action.payload.value;
          attribute.modifier = action.payload.modifier;
          return { ...state, characters: newCharacters, selectedAttribute: attribute, selectedCharacter: character  }
        }
      }
      return { ...state, characters: newCharacters, selectedAttribute: undefined, selectedCharacter: undefined  };
    }
    case 'UPDATE_SKILL': {
      const newCharacters = [...state.characters];
      const characterIndex = newCharacters.findIndex(char => char.name === action.payload.characterName);
      if (characterIndex > -1) {
        const newSkills = newCharacters[characterIndex].skills;
        const foundSkillIndex = newSkills.findIndex(skill => skill.name === action.payload.skill);
        if (foundSkillIndex > -1) {
          const skill = newSkills[foundSkillIndex];
          skill.value = action.payload.value
        }
      }
      return {...state, characters: newCharacters};
    }
    case 'ADD_CHARACTER': {
      const newCharacters = [...state.characters];
      newCharacters.push({
        name: action.payload,
        skills: SKILL_LIST.map(skill => ({...skill, value: 0})),
        attributes: ATTRIBUTE_LIST.map(attribute => ({attribute: attribute as any, value: 10, modifier: 0}))
      })
      return {...state, characters: newCharacters, selectedCharacter: undefined, selectedAttribute: undefined, selectedSkill: undefined, dc: 0, roll: 0, totalSkill: 0, partyRoll: 0};
    }
    case 'RESET_CHARACTERS': {
      const newCharacters = [...state.characters];
      const resetCharacters = newCharacters.map(character => {
        return ({
          name: character.name,
          attributes: ATTRIBUTE_LIST.map(attribute => ({attribute: attribute as any, value: 10, modifier: 0})),
          skills: SKILL_LIST.map(skill => ({...skill, value: 0}))
        });
      })
      return {...state, characters: resetCharacters, selectedAttribute: undefined, selectedCharacter: undefined, selectedSkill: undefined, 
        selectedPartySkill: undefined, dc: 0, roll: 0, totalSkill: 0, partyRoll: 0, partyDc: 0, totalPartySkill: 0};
    }
    case 'SET_SELECTED_SKILL': {
      return {...state, selectedSkill: action.payload.skill, selectedCharacter: action.payload.character};
    }
    case 'SET_SELECTED_PARTY_SKILL': {
      return {...state, selectedPartySkill: action.payload.skill, selectedCharacter: action.payload.character};
    }
    case 'SET_ROLL': {
      return {...state, roll: action.payload.roll, dc: action.payload.dc, totalSkill: action.payload.totalSkill, selectedCharacter: action.payload.character};
    }
    case 'SET_PARTY_ROLL': {
      return {...state, partyRoll: action.payload.partyRoll, partyDc: action.payload.partyDc, totalPartySkill: action.payload.partyTotalSkill, selectedCharacter: action.payload.character};
    }
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
  }
}