import {useState, useEffect} from 'react';
import {Dimensions, FlatList as RNFlatList} from 'react-native';
import {useInfiniteQuery} from '@tanstack/react-query';
import styled from 'styled-components/native';

import {PokemonCardProps} from '../types';

import {PokemonCard} from '../components/PokemonCard';
import {fetchPokemon, fetchSpecies} from '../utils/fetcher';

const {width: SCREEN_WIDTH} = Dimensions.get('screen');

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.mainBg};
`;

const FlatList = styled.FlatList`
  width: ${SCREEN_WIDTH}px;
` as unknown as typeof RNFlatList;

const Home = () => {
  const [totalData, setTotalData] = useState<PokemonCardProps[]>([]);

  const {
    data: pokemonData,
    hasNextPage: pokemonHasNextPage,
    fetchNextPage: pokemonFetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['pokemon'],
    queryFn: ({pageParam}) => {
      return fetchPokemon(pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
  });

  const {
    data: speciesData,
    hasNextPage: speciesHasNextPage,
    fetchNextPage: speciesFetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['species'],
    queryFn: ({pageParam}) => {
      return fetchSpecies(pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
  });

  const onEndReached = () => {
    if (pokemonHasNextPage) {
      pokemonFetchNextPage();
      speciesFetchNextPage();
    }
  };

  useEffect(() => {
    if (pokemonData && speciesData) {
      const arr: PokemonCardProps[] = [];
      pokemonData.pages.forEach((pokemonQuery, index) => {
        const speciesQuery = speciesData.pages[index];
        if (pokemonQuery && speciesQuery) {
          const obj = {
            id: pokemonQuery.id,
            name: speciesQuery.names.find(
              (name: any) => name.language.name === 'ko',
            ).name,
            types: pokemonQuery.types.map((type: any) => type.type.name),
            image: pokemonQuery.sprites.front_default,
          };
          arr.push(obj);
        }
      });
      setTotalData(arr);
    }
  }, [pokemonData, speciesData]);

  useEffect(() => {
    console.log('--------');
  }, []);

  useEffect(() => {
    if (totalData) {
      console.log(totalData);
    }
  }, [totalData]);

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
        onEndReached={onEndReached}
        onEndReachedThreshold={0.75}
        contentContainerStyle={{alignItems: 'center', marginTop: 20}}
      />
    </Container>
  );
};

export default Home;
