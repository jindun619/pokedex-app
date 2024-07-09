export interface PokemonCardProps {
  id: number;
  image: string;
  name: string;
  types: string[];
}

export interface StatsItemProps {
  name: string;
  value: string | number;
}
