import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';

import {Tabs} from './navigation/Tabs';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
