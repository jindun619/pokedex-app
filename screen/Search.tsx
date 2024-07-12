import styled from 'styled-components/native';

import {useTheme} from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Container = styled.View`
  flex: 1;
  padding: 10px;
  background-color: ${props => props.theme.mainBg};
`;
const SearchBar = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${props => props.theme.lightNeutral};
  width: 100%;
  padding: 10px;
  border-radius: 10px;
`;
const SearchButton = styled.TouchableOpacity``;
const SearchIcon = styled(Icon)`
  font-size: 20px;
  color: ${props => props.theme.neutral};
  margin-right: 5px;
`;
const SearchInput = styled.TextInput`
  flex: 1;
  font-size: 20px;
  color: ${props => props.theme.text};
  height: 20;
`;

const Search = () => {
  const theme = useTheme();

  return (
    <Container>
      <SearchBar>
        <SearchButton>
          <SearchIcon name="search" />
        </SearchButton>
        <SearchInput
          placeholderTextColor={theme.neutral}
          placeholder="포켓몬 이름을 입력하세요"
        />
      </SearchBar>
    </Container>
  );
};

export default Search;
