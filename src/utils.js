import { CLASS_LIST } from "./consts";

export const defaultCharacter = {
  class: CLASS_LIST.Barbarian,
  attributes: {
    Strength: {
      value: 0,
      modifier: 0,
    },
    Dexterity: {
      value: 0,
      modifier: 0,
    },
    Constitution: {
      value: 0,
      modifier: 0,
    },
    Intelligence: {
      value: 0,
      modifier: 0,
    },
    Wisdom: {
      value: 0,
      modifier: 0,
    },
    Charisma: {
      value: 0,
      modifier: 0,
    },
  },
};

export const mountDefaultCharacters = () => {
  return Object.entries(CLASS_LIST).map(([className, stats]) => {
    return {
      class: className,
      attributes: {
        Strength: {
          value: stats.Strength,
          modifier: calculateAttributeModifier(stats.Strength),
        },
        Dexterity: {
          value: stats.Dexterity,
          modifier: calculateAttributeModifier(stats.Dexterity),
        },
        Constitution: {
          value: stats.Constitution,
          modifier: calculateAttributeModifier(stats.Constitution),
        },
        Intelligence: {
          value: stats.Intelligence,
          modifier: calculateAttributeModifier(stats.Intelligence),
        },
        Wisdom: {
          value: stats.Wisdom,
          modifier: calculateAttributeModifier(stats.Wisdom),
        },
        Charisma: {
          value: stats.Charisma,
          modifier: calculateAttributeModifier(stats.Charisma),
        },
      },
    };
  });
};

export const calculateAttributeModifier = (value) => {
  return Math.floor((value - 10) / 2);
};

export const hasMinimumAttribute = (attribute, value, selectedClass) => {
  return value >= CLASS_LIST[selectedClass][attribute];
};
