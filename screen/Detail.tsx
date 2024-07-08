import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  color: ${props => props.theme.color.text};
`;

const Detail = ({route}) => {
  const {abc} = route.params;
  return (
    <Container>
      <Text>Detail Page {abc}</Text>
    </Container>
  );
};

export default Detail;
