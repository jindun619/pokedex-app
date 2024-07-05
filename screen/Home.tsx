import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 50px;
  color: black;
`;

const Home = () => {
  return (
    <Container>
      <Text>Home</Text>
    </Container>
  );
};

export default Home;
