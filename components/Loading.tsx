import styled from 'styled-components/native';

const View = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ActivityIndicator = styled.ActivityIndicator`
  color: ${props => props.theme.text};
`;

const Loading = () => {
  return (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );
};

export {Loading};
