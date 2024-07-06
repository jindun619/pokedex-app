import {useState, useEffect, useMemo} from 'react';
import {Dimensions} from 'react-native';
import {useQueries} from '@tanstack/react-query';
import styled from 'styled-components/native';

import {fetchPokemon, fetchPokemonSpecies} from '../fetcher/fetcher';
import {translate} from '../utils/utils';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const FlatList = styled.FlatList`
  width: ${SCREEN_WIDTH};
`;

const Card = styled.TouchableOpacity`
  border: 1px solid black;
  width: ${SCREEN_WIDTH - 30}px;
  margin: 15px 15px 0 15px;
  padding: 15px;
  border-radius: 30px;
`;

const Text = styled.Text`
  font-size: 20px;
  color: black;
`;

const Index = styled.Text`
  font-size: 20px;
  font-style: italic;
`;

const NameText = styled.Text`
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 10px;
`;

const ImageWrapper = styled.View`
  align-items: center;
`;
const Image = styled.Image`
  width: 200px;
  height: 200px;
`;

const TypesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const TypeBadge = styled.View`
  width: 100px;
  margin-right: 10px;
  border-radius: 7px;
  background-color: blue;
`;

const TypeText = styled.Text`
  text-align: center;
  font-size: 20px;
  padding: 10px;
  color: white;
`;

interface PokemonCardProps {
  id: number;
  image: string;
  name: string;
  types: string[];
}

const PokemonCard = ({id, image, name, types}: PokemonCardProps) => {
  return (
    <Card>
      <Index>#{id}</Index>
      <ImageWrapper>
        <Image source={{uri: image}} />
      </ImageWrapper>
      <NameText>{name}</NameText>
      <TypesContainer>
        {types.map((type: any) => (
          <TypeBadge>
            <TypeText key={type}>{translate.type(type)}</TypeText>
            <TypeText key={type + 1}>{translate.type(type)}</TypeText>
            <TypeText key={type + 2}>{translate.type(type)}</TypeText>
          </TypeBadge>
        ))}
      </TypesContainer>
    </Card>
  );
};

const Home = () => {
  const [totalData, setTotalData] = useState<any[]>([]);

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
      const arr: any[] = [];
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
        renderItem={({item}: any) => (
          <PokemonCard
            id={item.id}
            name={item.name}
            image={item.image}
            types={item.types}
          />
        )}
        contentContainerStyle={{alignItems: 'center'}}
      />
    </Container>
  );
};

export default Home;
