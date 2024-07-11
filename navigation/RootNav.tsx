import {createStackNavigator} from '@react-navigation/stack';

import {Tabs} from './Tabs';
import Detail from '../screen/Detail';

export type RootNavParamList = {
  Tab: undefined;
  Detail: {id: number | string};
};

const Stack = createStackNavigator<RootNavParamList>();

function RootNav() {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen name="Tab" component={Tabs} options={{title: '홈'}} />
      <Stack.Screen name="Detail" component={Detail} options={{title: ''}} />
    </Stack.Navigator>
  );
}

export {RootNav};
