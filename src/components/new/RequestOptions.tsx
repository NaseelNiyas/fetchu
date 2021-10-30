import { Option } from 'types';
import { createId } from 'utils';
import HeaderParam from './HeaderParam';
import { Context } from 'context/Request';
import theme from '../../theme/monaco.json';
import { useContext, useEffect, useState } from 'react';
import { AiOutlineQuestion } from 'react-icons/ai';
import { SettingsContext } from 'context/Settings';
import { BsHeadset, BsCodeSlash } from 'react-icons/bs';
import Editor, { useMonaco } from '@monaco-editor/react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Center,
  Select,
  Box,
  Text
} from '@chakra-ui/react';

const RequestOptions = () => {
  const monaco = useMonaco();

  monaco?.editor?.defineTheme('fetchu', theme);

  const [showGraphqlVariablesEditor, setShowGraphqlVariablesEditor] =
    useState(false);

  const {
    params,
    headers,
    setParams,
    setHeaders,
    bodyData,
    setBodyData,
    lang,
    setLang,
    graphqlVars,
    setGraphqlVars,
  } = useContext(Context);

  const { accentColor } = useContext(SettingsContext);

  useEffect(() => {
    if (lang !== 'graphql') {
      setShowGraphqlVariablesEditor(false);
    } else if (lang === 'graphql') {
      setShowGraphqlVariablesEditor(true);
    }
  }, [lang]);

  return (
    <Tabs
      variant='solid-rounded'
      colorScheme={accentColor}
      marginTop='20px'
      isLazy
    >
      <Center>
        <TabList>
          <Tab>
            Query Params <AiOutlineQuestion />
          </Tab>
          <Tab>
            Headers <BsHeadset />
          </Tab>
          <Tab>
            Body <BsCodeSlash />
          </Tab>
        </TabList>
      </Center>

      <TabPanels>
        <TabPanel>
          {/* Parameters */}
          {params.map((param: Option, index: number) => (
            // @ts-ignore
            <HeaderParam key={index} data={param} type='param' />
          ))}
          <Button
            colorScheme={accentColor}
            variant='outline'
            marginTop='4px'
            onClick={() =>
              setParams((params: Option[]) => [
                ...params,
                { key: '', value: '', id: createId(10) },
              ])
            }
          >
            Add
          </Button>
        </TabPanel>
        <TabPanel>
          {/* Headers  */}
          {headers.map((param: Option, index: number) => (
            // @ts-ignore
            <HeaderParam key={index} data={param} type='header' />
          ))}
          <Button
            colorScheme={accentColor}
            variant='outline'
            marginTop='4px'
            onClick={() =>
              setHeaders((headers: Option[]) => [
                ...headers,
                { key: '', value: '', id: createId(10) },
              ])
            }
          >
            Add
          </Button>
        </TabPanel>
        <TabPanel>
          {/* JSON Body */}
          {/* @ts-ignore */}
          <Select
            value={lang}
            // @ts-ignore
            onChange={(e) => setLang(e.target.value)}
            marginBottom='7'
            variant="filled"
          >
            <option value='json'>JSON</option>
            <option value='graphql'>GraphQL</option>
          </Select>
          <Editor
            height='30vh'
            language={lang}
            value={bodyData}
            theme='fetchu'
            width='400px'
            // @ts-ignore
            onChange={(val, e) => setBodyData(val as string)}
            options={{
              minimap: false,
              bracketPairColorization: true,
              fontFamily: 'Fira Code',
              fontSize: '15',
              lineHeight: 35,
              cursorSmoothCaretAnimation: true,
            }}
          />
            <Box display={!showGraphqlVariablesEditor ? 'none' : 'block'}>
              <Text>Graphql Variables</Text>
              <Editor
                height='30vh'
                language='json'
                // @ts-ignore
                value={graphqlVars}
                theme='fetchu'
                width='400px'
                // @ts-ignore
                onChange={(val, e) => setGraphqlVars(val as string)}
                options={{
                  minimap: false,
                  bracketPairColorization: true,
                  fontFamily: 'Fira Code',
                  fontSize: '15',
                  lineHeight: 35,
                  cursorSmoothCaretAnimation: true,
                }}
              />
            </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default RequestOptions;
