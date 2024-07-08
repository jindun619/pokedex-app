import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../screen/Home';

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
}

export {Tabs};
