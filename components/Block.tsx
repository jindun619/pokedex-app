import styled from 'styled-components/native';

const BlockName = styled.Text`
  color: ${props => props.theme.text};
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const BlockBody = styled.View`
  border-radius: 10px;
  margin-bottom: 30px;
`;

interface BlockProps {
  title: string;
  children: React.ReactNode;
}
const Block = ({title, children}: BlockProps) => {
  return (
    <>
      <BlockName>{title}</BlockName>
      <BlockBody>{children}</BlockBody>
    </>
  );
};

export {Block};
