import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Home from '../screen/Home';
import Search from '../screen/Search';

type TabsParamList = {
  Home: undefined;
  Search: undefined;
};

const Tab = createBottomTabNavigator<TabsParamList>();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleStyle: {fontSize: 30, fontWeight: 600},
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: '홈',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          title: '검색',
          tabBarIcon: ({color, size}) => (
            <Icon name="search" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export {Tabs};
