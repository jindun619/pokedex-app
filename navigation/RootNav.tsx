import {createStackNavigator} from '@react-navigation/stack';

import {Tabs} from './Tabs';
import Detail from '../screen/Detail';

const Stack = createStackNavigator();

function RootNav() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Tab" component={Tabs} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
}

export {RootNav};
