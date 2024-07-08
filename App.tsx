import {useState, useEffect} from 'react';
import {Appearance} from 'react-native';

import {
  DefaultTheme,
  DarkTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {ThemeProvider} from 'styled-components';

import {light, dark} from './theme';
import {RootNav} from './navigation/RootNav';

const queryClient = new QueryClient();

const App = () => {
  const [appTheme, setAppTheme] = useState('light');

  useEffect(() => {
    Appearance.addChangeListener(({colorScheme}) => {
      setAppTheme(Appearance.getColorScheme() === 'dark' ? 'dark' : 'light');
      return () => {};
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={appTheme === 'dark' ? dark : light}>
        <NavigationContainer
          theme={appTheme === 'dark' ? DarkTheme : DefaultTheme}>
          <RootNav />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
