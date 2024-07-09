const fetchPokemon = async (nameOrId: string | number) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const fetchSpecies = async (nameOrId: string | number) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${nameOrId}`,
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export {fetchPokemon, fetchSpecies};
