export type Pokemon = {
  id: number;
  name: string;
  korean_name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
  types: PokemonType[];
  abilities: PokemonAbilitie[];
  moves: PokemonMove[];
};

type PokemonType = { type: ElementName };

type PokemonAbilitie = { ability: ElementName };

type PokemonMove = { move: ElementName };

type ElementName = { name: string; korean_name: string };
