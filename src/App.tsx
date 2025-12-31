import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import Map from './components/Map';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Map></Map>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
