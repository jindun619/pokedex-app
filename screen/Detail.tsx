import {useState, useEffect, useRef} from 'react';

import {Dimensions, ScrollView} from 'react-native';

import styled from 'styled-components/native';
import {useQuery} from '@tanstack/react-query';

import {RouteProp} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {Block} from '../components/Block';
import {ColorBlock} from '../components/ColorBlock';
import {Stats} from '../components/Stats';

import {RootNavParamList} from '../navigation/RootNav';
import {convert, translate} from '../utils';
import {fetchPokemon, fetchSpecies, fetchSomething} from '../utils/fetcher';
import {StatsItemProps} from '../types';

import {TypeBadge} from '../components/TypeBadge';
import {MiniCard} from '../components/MiniCard';
import {Loading} from '../components/Loading';

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

const StyledScrollView = styled(ScrollView)`
  width: ${SCREEN_WIDTH}px;
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
  margin-top: 5px;
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

const FlavorTextContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 30px;
`;

const FlavorText = styled.Text`
  color: ${props => props.theme.text};
  font-size: 20px;
  padding-left: 10px;
  padding-right: 10px;
`;

const ReloadBtn = styled.TouchableOpacity``;

const ReloadIcon = styled(Icon)`
  color: ${props => props.theme.text};
`;

const TypesContainer = styled.View`
  flex-direction: row;
`;

const EvolutionFlatList = styled.FlatList`
  padding: 20px;
`;

const ChevronContainer = styled.View`
  justify-content: center;
`;
const ChevronIcon = styled(Icon)`
  color: ${props => props.theme.text};
`;

interface DetailDataProps {
  name: string;
  id: string;
  defaultImage: string;
  flavorTexts: string[];
  types: string[];
  specs: StatsItemProps[];
  stats: StatsItemProps[];
  evolution: string[];
}

type DetailScreenRouteProp = RouteProp<RootNavParamList, 'Detail'>;

interface DetailProps {
  route: DetailScreenRouteProp;
}
const Detail = ({route}: DetailProps) => {
  const [detailData, setDetailData] = useState<DetailDataProps>();
  const [flavorTextIndex, setFlavorTextIndex] = useState<number>(0);

  const setNewIndex = (num: number) => {
    const newIndex = Math.floor(Math.random() * num);
    setFlavorTextIndex(newIndex);
  };

  const {id} = route.params;

  const {data: pokemonData, isLoading: pokemonLoading} = useQuery({
    queryKey: ['pokemon', 'detail', id],
    queryFn: () => fetchPokemon(id),
  });
  const {data: speciesData, isLoading: speciesLoading} = useQuery({
    queryKey: ['species', 'detail', id],
    queryFn: () => fetchSpecies(id),
  });

  const {data: evolutionData, isLoading: evolutionLoading} = useQuery({
    queryKey: ['evolution', speciesData?.evolution_chain],
    queryFn: () => fetchSomething(speciesData?.evolution_chain.url),
    enabled: !!speciesData,
  });

  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({x: 0, y: 0});
    }
  }, [route]);

  useEffect(() => {
    if (pokemonData && speciesData && evolutionData) {
      type EvolutionNode = {
        species: {name: string};
        evolves_to: EvolutionNode[];
      };

      function extractEvolutionChain(data: EvolutionNode): string[] {
        const chain: string[] = [data.species.name];
        let current = data.evolves_to[0];

        while (current) {
          chain.push(current.species.name);
          current = current.evolves_to[0];
        }
        return chain;
      }

      const obj = {
        name: speciesData.names.find((name: any) => name.language.name === 'ko')
          .name,
        id: pokemonData.id,
        defaultImage: pokemonData.sprites.front_default,
        flavorTexts: speciesData.flavor_text_entries
          .filter((item: any) => item.language.name === 'ko')
          .map((item: any) => item.flavor_text),
        types: pokemonData.types.map((item: any) => item.type.name),
        specs: [
          {name: '신장', value: pokemonData.height},
          {name: '체중', value: pokemonData.weight},
        ],
        stats: pokemonData.stats.map((item: any) => {
          return {
            name: translate.stat(item.stat.name),
            value: item.base_stat,
          };
        }),
        evolution: extractEvolutionChain(evolutionData.chain),
      };
      setDetailData(obj);
    }
  }, [pokemonLoading, speciesLoading, evolutionLoading]);

  if (detailData) {
    return (
      <Container color={convert.typeColor(detailData.types[0])}>
        <StyledScrollView ref={scrollRef}>
          <NameText>{detailData.name}</NameText>
          <IndexText>{detailData.id}번째 포켓몬</IndexText>
          <ImageContainer>
            <Image
              source={{
                uri: detailData.defaultImage,
              }}
            />
          </ImageContainer>
          <FlavorTextContainer>
            <FlavorText>{detailData.flavorTexts[flavorTextIndex]}</FlavorText>
            <ReloadBtn
              onPress={() => setNewIndex(detailData.flavorTexts.length)}>
              <ReloadIcon name="redo-alt" size={24} />
            </ReloadBtn>
          </FlavorTextContainer>
          <Block title={'타입'}>
            <TypesContainer>
              {detailData.types.map((type: string) => (
                <TypeBadge
                  key={type}
                  name={translate.type(type) || ''}
                  color={convert.typeColor(type)}
                />
              ))}
            </TypesContainer>
          </Block>
          <ColorBlock title="스펙" type={detailData.types[0]}>
            <Stats data={detailData.specs} />
          </ColorBlock>
          <ColorBlock title="스탯" type={detailData.types[0]}>
            <Stats data={detailData.stats} />
          </ColorBlock>
          <ColorBlock title="진화" type={detailData.types[0]}>
            <EvolutionFlatList
              horizontal
              data={detailData.evolution}
              renderItem={({item}) => <MiniCard name={item as string} />}
              ItemSeparatorComponent={() => (
                <ChevronContainer>
                  <ChevronIcon name="chevron-right" size={50} />
                </ChevronContainer>
              )}
            />
          </ColorBlock>
        </StyledScrollView>
      </Container>
    );
  } else {
    return <Loading />;
  }
};

export default Detail;
