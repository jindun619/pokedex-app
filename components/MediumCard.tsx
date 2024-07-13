import styled from 'styled-components/native';

import {useNavigation} from '@react-navigation/native';

import {DetailScreenNavigationProp} from './LargeCard';
import {MediumCardProps} from '../types';

import {convert, translate} from '../utils';

import {TypeBadge} from './TypeBadge';

interface CardProps {
  color: string;
}
const Card = styled.TouchableOpacity<CardProps>`
  background-color: ${props =>
    convert.hexToRgba(props.color || '#000000', 0.2)};
  width: 49%;
  border-radius: 10px;
  padding: 10px;
`;
const ImageWrapper = styled.View``;
const Image = styled.Image`
  height: 80px;
`;
const NameContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;
const Name = styled.Text`
  color: ${props => props.theme.text};
  font-size: 20px;
  font-weight: 600;
`;
const Index = styled.Text`
  color: ${props => props.theme.neutral};
  font-size: 20px;
  font-weight: 600;
`;
const TypesContainer = styled.View`
  width: 100%;
  height: 80px;
`;

const MediumCard = ({id, image, name, types}: MediumCardProps) => {
  const navigation = useNavigation<DetailScreenNavigationProp>();
  const tmpTypes = ['grass', 'poison'];

  return (
    <Card
      onPress={() => {
        navigation.navigate('Detail', {id: id});
      }}
      color={convert.typeColor(types[0])}>
      <ImageWrapper>
        <Image resizeMode="contain" source={{uri: image}} />
      </ImageWrapper>
      <NameContainer>
        <Name>{name}</Name>
        <Index>#{id}</Index>
      </NameContainer>
      <TypesContainer>
        {tmpTypes.map((type: any) => (
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

export {MediumCard};
