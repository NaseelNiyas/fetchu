import './styles/code.css';
import theme from './theme';
import { TabWrapper as RequestWrapper } from './context/Request';
import FetchResponse from 'components/response/Response';
import Navbar from 'components/Navbar';
import { ChakraProvider } from '@chakra-ui/react';
import { SettingsWrapper } from 'context/Settings';
import New from 'components/New';

function App() {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <SettingsWrapper>
      <Navbar />
        <RequestWrapper>
          <New />
          <FetchResponse />
        </RequestWrapper>
      </SettingsWrapper>
    </ChakraProvider>
  );
}

export default App;
