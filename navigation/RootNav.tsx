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
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {fontSize: 30, fontWeight: 600},
      }}>
      <Stack.Screen
        name="Tab"
        component={Tabs}
        options={{title: '홈', headerShown: false}}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          title: '세부정보',
          headerShown: true,
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

export {RootNav};
