import {useState, useEffect} from 'react';

import styled from 'styled-components/native';

import {useQuery} from '@tanstack/react-query';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootNavParamList} from '../navigation/RootNav';

import {convert, translate} from '../utils';
import {fetchPokemon, fetchSpecies} from '../utils/fetcher';

import {TypeBadge} from './TypeBadge';

const MiniCardContainer = styled.TouchableOpacity`
  width: 200px;
  height: 200px;
  justify-content: center;
`;
const ImageContainer = styled.View`
  align-items: center;
  margin-bottom: 10px;
`;
const Image = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border: 2px solid ${props => props.theme.text};
`;
const NameContainer = styled.View`
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Name = styled.Text`
  color: ${props => props.theme.text};
  font-size: 20px;
  font-weight: 500;
`;
const Index = styled.Text`
  color: ${props => props.theme.neutral};
  font-size: 20px;
  font-weight: 500;
`;
const TypesContainer = styled.View`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  flex-direction: row;
`;

type DetailScreenNavigationProp = StackNavigationProp<
  RootNavParamList,
  'Detail'
>;
interface MiniCardDataProps {
  image: string;
  name: string;
  index: number;
  types: string[];
}
interface MiniCardProps {
  name: string;
}
const MiniCard = ({name}: MiniCardProps) => {
  const navigation = useNavigation<DetailScreenNavigationProp>();

  const [miniCardData, setMiniCardData] = useState<MiniCardDataProps>();

  const {
    data: pokemonData,
    isLoading: pokemonLoading,
    error: pokemonError,
  } = useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => fetchPokemon(name),
  });
  const {
    data: speciesData,
    isLoading: speciesLoading,
    error: speciesError,
  } = useQuery({
    queryKey: ['species', name],
    queryFn: () => fetchSpecies(name),
  });

  useEffect(() => {
    if (!pokemonLoading && !speciesLoading) {
      const obj = {
        image: pokemonData.sprites.front_default,
        name: speciesData.names.find((name: any) => name.language.name === 'ko')
          .name,
        index: pokemonData.id,
        types: pokemonData.types.map((item: any) => item.type.name),
      };
      setMiniCardData(obj);
    }
  }, [pokemonLoading, speciesLoading]);

  if (miniCardData) {
    return (
      <MiniCardContainer
        onPress={() => navigation.navigate('Detail', {id: name})}>
        <ImageContainer>
          <Image
            source={{
              uri: miniCardData.image,
            }}
          />
        </ImageContainer>
        <NameContainer>
          <Name>{miniCardData.name}</Name>
          <Index>#{miniCardData.index}</Index>
        </NameContainer>
        <TypesContainer>
          {miniCardData.types.map((type: string) => (
            <TypeBadge
              key={type}
              name={translate.type(type) || ''}
              color={convert.typeColor(type)}
            />
          ))}
        </TypesContainer>
      </MiniCardContainer>
    );
  }
};

export {MiniCard};
