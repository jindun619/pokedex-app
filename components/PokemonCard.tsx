import {Dimensions} from 'react-native';

import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {PokemonCardProps} from '../types';
import {RootNavParamList} from '../navigation/RootNav';

import {TypeBadge} from './TypeBadge';

import {translate, convert} from '../utils';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface CardProps {
  color: string;
}
const Card = styled.TouchableOpacity<CardProps>`
  background-color: ${props =>
    convert.hexToRgba(props.color || '#000000', 0.2)};
  width: ${SCREEN_WIDTH - 30}px;
  margin: 15px 15px 0 15px;
  padding: 15px;
  border-radius: 10px;
`;

const Index = styled.Text`
  color: ${props => props.theme.neutral};
  font-size: 20px;
  font-style: italic;
`;

const NameText = styled.Text`
  color: ${props => props.theme.text};
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
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
`;

type DetailScreenNavigationProp = StackNavigationProp<
  RootNavParamList,
  'Detail'
>;

const PokemonCard = ({id, image, name, types}: PokemonCardProps) => {
  const navigation = useNavigation<DetailScreenNavigationProp>();

  return (
    <Card
      onPress={() => navigation.navigate('Detail', {id: 1})}
      color={convert.typeColor(types[0])}>
      <Index>#{id}</Index>
      <ImageWrapper>
        <Image source={{uri: image}} />
      </ImageWrapper>
      <NameText>{name}</NameText>
      <TypesContainer>
        {types.map((type: any) => (
          <TypeBadge
            key={type}
            name={translate.type(type) || ''}
            color={convert.typeColor(type)}
          />
        ))}
      </TypesContainer>
    </Card>
  );
};

export {PokemonCard};
