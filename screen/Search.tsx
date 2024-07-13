import {InteractionManager, FlatList as RNFlatList} from 'react-native';

import styled from 'styled-components/native';
import {
  useInfiniteQuery,
  useQueries,
  useQueryClient,
} from '@tanstack/react-query';

import {useTheme} from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {MediumCard} from '../components/MediumCard';
import {MediumCardProps} from '../types';
import {useEffect} from 'react';
import {fetchPokemon, fetchSpecies} from '../utils/fetcher';
import {hasteMapCacheDirectory} from '../metro.config';

const Button = styled.TouchableOpacity``;
const ButtonText = styled.Text``;
const Container = styled.View`
  flex: 1;
  padding: 10px;
  background-color: ${props => props.theme.mainBg};
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

const Search = () => {
  const queryClient = useQueryClient();
  const theme = useTheme();

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

  const {data, isLoading, hasNextPage, fetchNextPage} = useInfiniteQuery({
    queryKey: ['aaa'],
    queryFn: async ({pageParam}) => {
      const cachedData = queryClient.getQueryData(['aaa', pageParam]);
      if (cachedData) {
        console.log('cachedData exists!');
        return cachedData;
      } else {
        console.log("cachedData doesn't exist!");
      }
      return fetchPokemon(pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: (_, pages) => pages.length + 1,
  });

  useEffect(() => {
    if (!isLoading && hasNextPage) {
      fetchNextPage();
    }
    if (!hasNextPage) {
      console.log('no more page');
    }
  }, [data, isLoading, hasNextPage]);

  return (
    <Container>
      <Button
        onPress={() => {
          fetchNextPage();
        }}>
        <ButtonText>Load More</ButtonText>
      </Button>
      <Button
        onPress={() => {
          queryClient.removeQueries();
        }}>
        <ButtonText>Clear Queries</ButtonText>
      </Button>
      <Button
        onPress={() => {
          console.log(data?.pages.length);
          data?.pages.map(page => {
            console.log(page.name);
          });
        }}>
        <ButtonText>Current Data</ButtonText>
      </Button>
      <ButtonText>{data?.pages.length}</ButtonText>
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
    </Container>
  );
};

export default Search;
