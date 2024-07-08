const types: {[key: string]: string} = {
  normal: '노말',
  fighting: '격투',
  flying: '비행',
  poison: '독',
  ground: '땅',
  rock: '바위',
  bug: '벌레',
  ghost: '고스트',
  steel: '강철',
  fire: '불꽃',
  water: '물',
  grass: '풀',
  electric: '전기',
  psychic: '에스퍼',
  ice: '얼음',
  dragon: '드래곤',
  dark: '악',
  fairy: '페어리',
  unknown: '???',
  shadow: '다크',
};

const typeColors = {
  normal: '#A8A77A',
  fighting: '#C22E28',
  flying: '#A98FF3',
  poison: '#A33EA1',
  ground: '#E2BF65',
  rock: '#B6A136',
  bug: '#A6B91A',
  ghost: '#735797',
  steel: '#B7B7CE',
  fire: '#EE8130',
  water: '#6390F0',
  grass: '#7AC74C',
  electric: '#F7D02C',
  psychic: '#F95587',
  ice: '#96D9D6',
  dragon: '#6F35FC',
  dark: '#705746',
  fairy: '#D685AD',
  unknown: '#A41B55',
  shadow: '#181e31',
};

const translate = {
  type: (en: keyof typeof types): string | undefined => {
    return types[en];
  },
};

const convert = {
  typeColor: (typeName: string): string => {
    if (typeColors.hasOwnProperty(typeName)) {
      return typeColors[typeName as keyof typeof typeColors];
    } else {
      return '#000000';
    }
  },
  hexToRgba: (hex: string, transparency: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${transparency})`;
  },
};

export {translate, convert};
