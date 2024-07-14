import {InteractionManager, FlatList as RNFlatList} from 'react-native';

import styled from 'styled-components/native';
import {
  useInfiniteQuery,
  useQueries,
  useQueryClient,
} from '@tanstack/react-query';
import * as Progress from 'react-native-progress';

import {useTheme} from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {MediumCard} from '../components/MediumCard';
import {MediumCardProps} from '../types';
import {useEffect, useState} from 'react';
import {fetchPokemon, fetchSpecies} from '../utils/fetcher';
import {getTotalQuantity} from '../utils';

const Button = styled.TouchableOpacity``;
const ButtonText = styled.Text``;
const Container = styled.View`
  flex: 1;
  padding: 10px;
  background-color: ${props => props.theme.mainBg};
`;
const ProgressContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const ProgressText = styled.Text`
  color: ${props => props.theme.text};
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 20px;
`;
const ProgressTextNeutral = styled.Text`
  color: ${props => props.theme.neutral};
  font-size: 20px;
  font-weight: 500;
  margin-top: 20px;
`;
const SearchBar = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${props => props.theme.lightNeutral};
  width: 100%;
  padding: 10px;
  border-radius: 10px;
`;
const SearchButton = styled.TouchableOpacity``;
const SearchIcon = styled(Icon)`
  font-size: 20px;
  color: ${props => props.theme.neutral};
  margin-right: 5px;
`;
const SearchInput = styled.TextInput`
  flex: 1;
  font-size: 20px;
  color: ${props => props.theme.text};
  height: 20px;
`;
const CardsContainer = styled.FlatList`
  flex: 1;
  margin-top: 10px;
  padding: 5px;
` as unknown as typeof RNFlatList;
const ItemSeparator = styled.View`
  height: 10px;
`;

const TOTAL_QUANTITY = getTotalQuantity();

const Search = () => {
  const queryClient = useQueryClient();
  const theme = useTheme();

  const [pokemonLoaded, setPokemonLoaded] = useState<Boolean>(false);
  const [speciesLoaded, setSpeciesLoaded] = useState<Boolean>(false);

  const tmpData = [
    {
      id: 1,
      name: 'bulbasuar',
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png',
      types: ['grass', 'poison'],
    },
    {
      id: 2,
      name: 'bulbasuar',
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png',
      types: ['grass', 'poison'],
    },
    {
      id: 3,
      name: 'bulbasuar',
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png',
      types: ['grass', 'poison'],
    },
    {
      id: 4,
      name: 'bulbasuar',
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png',
      types: ['grass', 'poison'],
    },
  ];

  const {
    data: pokemonData,
    isLoading: pokemonLoading,
    hasNextPage: pokemonHasNextPage,
    fetchNextPage: pokemonFetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['pokemon'],
    queryFn: async ({pageParam}) => {
      const cachedData = queryClient.getQueryData(['pokemon', pageParam]);
      if (cachedData) {
        return cachedData;
      }
      return fetchPokemon(pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: (_, pages) => {
      const nextPage = pages.length + 1;
      return nextPage <= TOTAL_QUANTITY ? nextPage : undefined;
    },
  });
  const {
    data: speciesData,
    isLoading: speciesLoading,
    hasNextPage: speciesHasNextPage,
    fetchNextPage: speciesFetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['species'],
    queryFn: async ({pageParam}) => {
      const cachedData = queryClient.getQueryData(['species', pageParam]);
      if (cachedData) {
        return cachedData;
      }
      return fetchSpecies(pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: (_, pages) => {
      const nextPage = pages.length + 1;
      return nextPage <= TOTAL_QUANTITY ? nextPage : undefined;
    },
  });

  useEffect(() => {
    if (pokemonHasNextPage) {
      pokemonFetchNextPage();
    } else if (!pokemonLoading) {
      setPokemonLoaded(true);
    }
  }, [pokemonData, pokemonLoading, pokemonHasNextPage]);
  useEffect(() => {
    if (speciesHasNextPage) {
      speciesFetchNextPage();
    } else if (!speciesLoading) {
      setSpeciesLoaded(true);
    }
  }, [speciesData, speciesLoading, speciesHasNextPage]);

  return (
    <Container>
      <ButtonText>{pokemonData?.pages.length}</ButtonText>
      <SearchBar>
        <SearchButton>
          <SearchIcon name="search" />
        </SearchButton>
        <SearchInput
          placeholderTextColor={theme.neutral}
          placeholder="포켓몬 이름을 입력하세요"
          returnKeyType="search"
        />
      </SearchBar>
      {!pokemonLoaded || !speciesLoaded ? (
        <ProgressContainer>
          <ProgressText>데이터를 불러오는 중..</ProgressText>
          <Progress.Bar
            progress={
              pokemonData ? pokemonData?.pages.length / TOTAL_QUANTITY : 0
            }
            width={250}
            height={15}
          />
          <ProgressTextNeutral>
            빨리 가져오는 법 아는분 알려주세요..ㅠ
          </ProgressTextNeutral>
        </ProgressContainer>
      ) : (
        <CardsContainer
          data={tmpData}
          renderItem={({item}: {item: MediumCardProps}) => (
            <MediumCard
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              types={item.types}
            />
          )}
          ItemSeparatorComponent={() => <ItemSeparator />}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
        />
      )}
    </Container>
  );
};

export default Search;
