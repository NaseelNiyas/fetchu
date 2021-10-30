import { useContext, useEffect, useState } from 'react';
import hljs from 'highlight.js';
import prettyBytes from 'pretty-bytes';
import { Context } from '../../context/Request';
import {
  Center,
  Box,
  Text,
  Tabs,
  Spinner,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Checkbox,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import { SettingsContext } from 'context/Settings';

const Response = () => {
  const { response, loading } = useContext(Context);
  const { accentColor } = useContext(SettingsContext);

  const [raw, setRaw] = useState(false);

  useEffect(() => {
    hljs.highlightAll();
    // @ts-ignore
  }, [response?.data, raw]);

  return (
    <>
      {!response?.data ? (
        // @ts-ignore
        <>
          {loading && (
            <Center>
              <Spinner />
            </Center>
          )}
        </>
      ) : (
        <Center>
          <Box>
            <span>
              Status:{' '}
              <Text
                color={
                  response.status > 199 && response.status < 300
                    ? '#49eb64'
                    : response.status > 399 && response.status < 600
                    ? '#eb5e49'
                    : 'auto'
                }
                display='inline'
                marginRight='5'
              >
                {response.status} {response.statusText}
              </Text>
            </span>
            {/* @ts-ignore */}
            {response.customData !== undefined && (
              <>
                {' '}
                <Text marginLeft='5' display='inline'>
                  {/* @ts-ignore */}
                  Time: {response.customData.time} ms
                </Text>
                <Text display='inline' marginLeft='5'>
                  {/* @ts-ignore */}
                  {response?.customData?.size && (
                    <>
                      Size: {/* @ts-ignore */}
                      {prettyBytes(response.customData.size)}
                    </>
                  )}
                </Text>
              </>
            )}
            {response.data && (
              <Tabs colorScheme={accentColor}>
                <TabList>
                  <Tab>Body</Tab>
                  <Tab>Headers</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Checkbox
                      colorScheme={accentColor}
                      marginBottom='5'
                      checked={raw}
                      onChange={() => setRaw((raw) => !raw)}
                    >
                      Raw
                    </Checkbox>
                    <pre>
                      {raw ? (
                        <Box
                          className='nohighlight'
                          maxWidth='80vw'
                          minHeight='50'
                          overflowY='scroll'
                        >
                          {JSON.stringify(response.data, null, '')}
                        </Box>
                      ) : (
                        /* @ts-ignore */
                        <code className='language-json'>
                          {JSON.stringify(response.data, null, '  ')}
                        </code>
                      )}
                    </pre>
                  </TabPanel>
                  <TabPanel>
                    <Center>
                      <Table variant='simple'>
                        <Thead>
                          <Tr>
                            <Th>Name</Th>
                            <Th>Value</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {Object.entries(response.headers).map(
                            ([key, val], index) => (
                              <Tr key={index}>
                                <Td>{key}</Td>
                                <Td>{val}</Td>
                              </Tr>
                            )
                          )}
                        </Tbody>
                      </Table>
                    </Center>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            )}
          </Box>
        </Center>
      )}
    </>
  );
};

export default Response;
