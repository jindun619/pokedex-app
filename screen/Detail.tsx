import {Dimensions} from 'react-native';

import styled from 'styled-components/native';
import {useQuery} from '@tanstack/react-query';

import {RouteProp} from '@react-navigation/native';

import {RootNavParamList} from '../navigation/RootNav';

import {convert} from '../utils';
import {fetchPokemon, fetchPokemonSpecies} from '../fetcher/fetcher';

import {TypeBadge} from '../components/TypeBadge';

const {width: SCREEN_WIDTH} = Dimensions.get('screen');

interface ContainerProps {
  color: string;
}
const Container = styled.View<ContainerProps>`
  background-color: ${props =>
    convert.hexToRgba(props.color || '#000000', 0.2)};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ScrollView = styled.ScrollView`
  width: ${SCREEN_WIDTH};
  padding: 15px;
  margin-top: 30px;
`;
const NameText = styled.Text`
  color: ${props => props.theme.text};
  font-size: 45px;
  font-weight: 600;
  text-align: center;
`;
const IndexText = styled.Text`
  color: ${props => props.theme.neutral};
  font-size: 20px;
  font-weight: 500;
  text-align: center;
`;
const ImageContainer = styled.View`
  align-items: center;
`;
const Image = styled.Image`
  width: 250px;
  height: 250px;
`;

const BlockName = styled.Text`
  color: ${props => props.theme.text};
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Block = styled.View`
  border-radius: 10px;
  margin-bottom: 10px;
`;

interface ColorBlockProps {
  color?: string;
}
const ColorBlock = styled.View<ColorBlockProps>`
  background-color: ${props =>
    convert.hexToRgba(props.color || '#000000', 0.3)};
  border-radius: 10px;
  margin-bottom: 10px;
`;

const TypesContainer = styled.View``;

const StatsContainer = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  padding: 20px;
`;

const Stat = styled.View`
  width: 50%;
  margin-bottom: 20px;
`;

const StatName = styled.Text`
  color: ${props => props.theme.text};
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const StatValue = styled.Text`
  color: ${props => props.theme.text};
  font-size: 20px;
  font-weight: 500;
`;

type DetailScreenRouteProp = RouteProp<RootNavParamList, 'Detail'>;

interface DetailProps {
  route: DetailScreenRouteProp;
}
const Detail = ({route}: DetailProps) => {
  const {id} = route.params;
  const {
    data: pokemonData,
    isLoading: pokemonLoading,
    error: pokemonError,
  } = useQuery({
    queryKey: ['pokemon', 'detail', id],
    queryFn: () => fetchPokemon(id),
  });
  const {
    data: pokemonSpeciesData,
    isLoading: pokemonSpeciesLoading,
    error: pokemonSpeciesError,
  } = useQuery({
    queryKey: ['pokemonSpecies', 'detail', id],
    queryFn: () => fetchPokemon(id),
  });

  return (
    <Container color={convert.typeColor('grass')}>
      <ScrollView>
        <NameText>Name</NameText>
        <IndexText>0001번째 포켓몬</IndexText>
        <ImageContainer>
          <Image
            source={{
              uri: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/002.png',
            }}
          />
        </ImageContainer>
        <BlockName>타입</BlockName>
        <Block>
          <TypesContainer>
            <TypeBadge name="type" color="green" />
          </TypesContainer>
        </Block>
        <BlockName>스탯</BlockName>
        <ColorBlock color={convert.typeColor('grass')}>
          <StatsContainer>
            <Stat>
              <StatName>신장</StatName>
              <StatValue>1.8m</StatValue>
            </Stat>
            <Stat>
              <StatName>신장</StatName>
              <StatValue>1.8m</StatValue>
            </Stat>
            <Stat>
              <StatName>신장</StatName>
              <StatValue>1.8m</StatValue>
            </Stat>
          </StatsContainer>
        </ColorBlock>
      </ScrollView>
    </Container>
  );
};

export default Detail;
