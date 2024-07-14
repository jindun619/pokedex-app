import {useState, useEffect} from 'react';
import {Appearance, InteractionManager} from 'react-native';

import {
  DefaultTheme,
  DarkTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {ThemeProvider} from 'styled-components';

import {light, dark} from './theme';
import {RootNav} from './navigation/RootNav';
import {fetchPokemon, fetchSpecies} from './utils/fetcher';
import {getTotalQuantity} from './utils';

const TOTAL_QUANTITY = getTotalQuantity();

const queryClient = new QueryClient();

const App = () => {
  const [appTheme, setAppTheme] = useState('light');

  // Prefetch Data
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      const prefetchPages = async () => {
        const pageNumbers = Array.from(
          {length: TOTAL_QUANTITY},
          (_, i) => i + 1,
        );
        const chunkSize = 100;

        for (let i = 0; i < pageNumbers.length; i += chunkSize) {
          const chunk = pageNumbers.slice(i, i + chunkSize);
          await Promise.all(
            chunk.map(pageNumber => {
              queryClient.prefetchQuery({
                queryKey: ['pokemon', pageNumber],
                queryFn: () => fetchPokemon(pageNumber),
                staleTime: Infinity,
              });
              queryClient.prefetchQuery({
                queryKey: ['species', pageNumber],
                queryFn: () => fetchSpecies(pageNumber),
                staleTime: Infinity,
              });
            }),
          );
        }
      };

      prefetchPages();
    });
  }, []);

  useEffect(() => {
    Appearance.addChangeListener(() => {
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
