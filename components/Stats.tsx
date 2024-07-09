import styled from 'styled-components/native';

import {StatsItemProps} from '../types';

const StatsContainer = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  padding: 20px;
`;

const Stat = styled.View`
  width: 50%;
  margin-bottom: 20px;
`;

const StatName = styled.Text`
  color: ${props => props.theme.text};
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const StatValue = styled.Text`
  color: ${props => props.theme.text};
  font-size: 20px;
  font-weight: 500;
`;

interface StatsProps {
  data: StatsItemProps[];
}
const Stats = ({data}: StatsProps) => {
  return (
    <StatsContainer>
      {data.map(({name, value}: StatsItemProps) => (
        <Stat key={name}>
          <StatName>{name}</StatName>
          <StatValue>{value}</StatValue>
        </Stat>
      ))}
    </StatsContainer>
  );
};

export {Stats};
