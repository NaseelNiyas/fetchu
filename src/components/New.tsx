import { EnvVar, Option } from '../types/';
import { Context } from '../context/Request';
import { SyntheticEvent, useContext } from 'react';
import { SettingsContext } from 'context/Settings';
import RequestOptions from 'components/new/RequestOptions';
import { Center, Input, Select, Button } from '@chakra-ui/react';
import axios, { AxiosRequestHeaders } from 'axios';
import { parseEnvVarsFromString } from 'utils';

const New = () => {
  const {
    url,
    method,
    setUrl,
    setMethod,
    headers,
    params,
    setResponse,
    bodyData,
    setLoading,
    lang,
    graphqlVars,
  } = useContext(Context);

  const { accentColor, envVars } = useContext(SettingsContext);

  const request = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    let requestHeaders: AxiosRequestHeaders = {} as AxiosRequestHeaders;
    let requestParams: URLSearchParams = new URLSearchParams();

    params.forEach((param: Option) => {
      if (param.key !== '' || param.value !== '') {
        requestParams.append(param.key, param.value);
      }
    });
    headers.forEach((header: Option) => {
      if (header.key !== '' && header.value !== '') {
        requestHeaders[header.key] = header.value;
      }
    });
    let requestURL =
      params.length !== 0 ? url + '?' + requestParams.toString() : url;

    const replaceWithEnvVars = (url: string): string => {
      let parsedEnvVars = parseEnvVarsFromString(url);
      parsedEnvVars.forEach((envVar: string) => {
        url = url.replaceAll(
          envVar,
          envVars.find(
            (envVarFromFind) =>
              envVarFromFind.name === envVar.slice(2).slice(0, -2)
          )?.value || ''
        );
      });
      url = url.replaceAll('{{', '').replaceAll('}}', '');

      console.log(url);
      return url;
    };
    try {
      
      const resp = await axios.post(
        process.env.REACT_APP_PROXY_API_URL as string,
        {
          data: {
            method,
            headers: requestHeaders,
            url: replaceWithEnvVars(requestURL),
            bodyData:
              lang === 'json'
                ? JSON.parse(bodyData)
                : lang === 'graphql' &&
                  JSON.stringify({ query: bodyData, variables: graphqlVars }),
          },
        }
      );
      // debugger;
      setResponse({
        // @ts-ignore
        data: resp.data.data,
        // @ts-ignore
        status: resp.data.status,
        // @ts-ignore
        statusText: resp.data.statusText,
        // @ts-ignore
        headers: resp.data.headers,
        // @ts-ignore
        config: resp.data.config,
        // @ts-ignore
        customData: {
          // @ts-ignore
          time: resp.data.time ?? '-',
          // @ts-ignore
          size: resp.data.size,
        },
      });
      setLoading(false);
    } catch (err: any) {
      console.log('catch!');
      console.log(err.message);

      if (err.response) {
        setResponse(err.response);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Center>
        <form onSubmit={request}>
          <Select
            width='120px'
            variant='filled'
            display='inline-flex'
            borderRadius='0'
            height='50px'
            borderLeftRadius='5px'
            value={method}
            // @ts-ignore
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value='get'>GET</option>
            <option value='post'>POST</option>
            <option value='put'>PUT</option>
            <option value='patch'>PATCH</option>
            <option value='delete'>DELETE</option>
            <option value='options'>OPTIONS</option>
            <option value='head'>HEAD</option>
          </Select>
          <Input
            variant='filled'
            width='400px'
            placeholder='URL'
            required
            type='url'
            borderRadius='0'
            height='50px'
            marginTop='10px'
            value={url}
            colorScheme={accentColor}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button
            colorScheme={accentColor}
            type='submit'
            variant='outline'
            borderRadius='0'
            borderRightRadius='5px'
            marginTop='0'
            height='50px'
            display='inline-flex'
          >
            Send
          </Button>
        </form>
      </Center>
      <Center>
        <RequestOptions />
      </Center>
    </>
  );
};

export default New;
