import {useState, useEffect, useMemo} from 'react';
import {Dimensions, FlatList as RNFlatList} from 'react-native';
import {useQueries} from '@tanstack/react-query';
import styled from 'styled-components/native';

import {PokemonCardProps} from '../types';

import {PokemonCard} from '../components/PokemonCard';
import {fetchPokemon, fetchPokemonSpecies} from '../fetcher/fetcher';

const {width: SCREEN_WIDTH} = Dimensions.get('screen');

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.color.mainBg};
`;

const FlatList = styled.FlatList`
  width: ${SCREEN_WIDTH};
` as unknown as typeof RNFlatList;

const Home = () => {
  const [totalData, setTotalData] = useState<PokemonCardProps[]>([]);

  const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const pokemonData = useQueries({
    queries: ids.map((id: number) => ({
      queryKey: ['pokemon', id],
      queryFn: () => fetchPokemon(id),
    })),
  });
  const pokemonSpeciesData = useQueries({
    queries: ids.map((id: number) => ({
      queryKey: ['pokemonSpecies', id],
      queryFn: () => fetchPokemonSpecies(id),
    })),
  });

  const pokemonDataLoading: boolean = useMemo(
    () => pokemonData.some(query => query.isLoading),
    [pokemonData],
  );
  const pokemonSpeciesDataLoading: boolean = useMemo(
    () => pokemonSpeciesData.some(query => query.isLoading),
    [pokemonSpeciesData],
  );

  useEffect(() => {
    if (!pokemonDataLoading && !pokemonSpeciesDataLoading) {
      const arr: PokemonCardProps[] = [];
      pokemonData.forEach((pokemonQuery, index) => {
        const speciesQuery = pokemonSpeciesData[index];
        if ((pokemonQuery.data, speciesQuery.data)) {
          const obj = {
            id: pokemonData[index].data.id,
            name: pokemonSpeciesData[index].data.names.find(
              (name: any) => name.language.name === 'ko',
            ).name,
            types: pokemonData[index].data.types.map(
              (type: any) => type.type.name,
            ),
            image: pokemonData[index].data.sprites.front_default,
          };
          arr.push(obj);
        }
      });
      setTotalData(arr);
    }
  }, [pokemonDataLoading, pokemonSpeciesDataLoading]);

  return (
    <Container>
      <FlatList
        data={totalData}
        keyExtractor={(item: PokemonCardProps) => item.id.toString()}
        renderItem={({item}: {item: PokemonCardProps}) => (
          <PokemonCard
            id={item.id}
            name={item.name}
            image={item.image}
            types={item.types}
          />
        )}
        contentContainerStyle={{alignItems: 'center', marginTop: 20}}
      />
    </Container>
  );
};

export default Home;
