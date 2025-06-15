export type Attributes = {
    Strength: number;
    Dexterity: number;
    Constitution: number;
    Intelligence: number;
    Wisdom: number;
    Charisma: number;
};

export type Class = "Barbarian" | "Wizard" | "Bard";

export interface Character {
    name: string;
    attributes: AttributeState[];
    skills: SkillState[];
}

export interface AttributeState {
    attribute: keyof Attributes;
    value: number;
    modifier: number;
}

export interface SkillState {
    name: string;
    attributeModifier: keyof Attributes;
    value: number;
}

