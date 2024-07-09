import styled from 'styled-components/native';
import {convert} from '../utils';

const BlockName = styled.Text`
  color: ${props => props.theme.text};
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 10px;
`;

interface BlockBodyProps {
  color: string;
}
const BlockBody = styled.View<BlockBodyProps>`
  background-color: ${props =>
    convert.hexToRgba(props.color || '#000000', 0.3)};
  border-radius: 10px;
  margin-bottom: 30px;
`;

interface ColorBlockProps {
  title: string;
  type: string;
  children: React.ReactNode;
}
const ColorBlock = ({title, type, children}: ColorBlockProps) => {
  return (
    <>
      <BlockName>{title}</BlockName>
      <BlockBody color={convert.typeColor(type)}>{children}</BlockBody>
    </>
  );
};

export {ColorBlock};
