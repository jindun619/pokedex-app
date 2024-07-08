import {Dimensions} from 'react-native';

import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

import {PokemonCardProps} from '../types';

import {translate, convert} from '../utils/utils';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Card = styled.TouchableOpacity`
  background-color: ${props => props.theme.color.secondBg};
  width: ${SCREEN_WIDTH - 30}px;
  margin: 15px 15px 0 15px;
  padding: 15px;
  border-radius: 10px;
`;

const Index = styled.Text`
  color: ${props => props.theme.color.text};
  font-size: 20px;
  font-style: italic;
`;

const NameText = styled.Text`
  color: ${props => props.theme.color.text};
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
  flex-wrap: wrap;
  flex-direction: row;
`;

const TypeBadge = styled.View<{color: string}>`
  width: 90px;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 7px;
  background-color: ${props => props.color};
`;

const TypeText = styled.Text`
  text-align: center;
  font-size: 20px;
  padding: 10px;
  color: white;
`;

const PokemonCard = ({id, image, name, types}: PokemonCardProps) => {
  const navigation = useNavigation();

  return (
    <Card onPress={() => navigation.navigate('Detail', {abc: 'hi'})}>
      <Index>#{id}</Index>
      <ImageWrapper>
        <Image source={{uri: image}} />
      </ImageWrapper>
      <NameText>{name}</NameText>
      <TypesContainer>
        {types.map((type: any) => (
          <TypeBadge color={convert.typeColor(type)}>
            <TypeText key={type}>{translate.type(type)}</TypeText>
          </TypeBadge>
        ))}
      </TypesContainer>
    </Card>
  );
};

export {PokemonCard};
