import styled from 'styled-components/native';

const Badge = styled.View<{color: string}>`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-right: 2px;
  margin-bottom: 5px;
  border-radius: 7px;
  background-color: ${props => props.color};
`;

const Text = styled.Text`
  text-align: center;
  font-size: 20px;
  padding: 10px;
  color: white;
`;

interface TypeBadgeProps {
  color: string;
  name: string;
}
const TypeBadge = ({name, color}: TypeBadgeProps) => {
  return (
    <Badge color={color}>
      <Text>{name}</Text>
    </Badge>
  );
};

export {TypeBadge};
