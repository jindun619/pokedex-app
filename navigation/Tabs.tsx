import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../screen/Home';

type TabsParamList = {
  Home: undefined;
};

const Tab = createBottomTabNavigator<TabsParamList>();

function Tabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
}

export {Tabs};
