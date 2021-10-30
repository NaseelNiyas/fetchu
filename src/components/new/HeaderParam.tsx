import { Input, Button, Box, Tooltip } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { Option } from 'types';
import { Context } from '../../context/Request';

interface Props {
  data: Option;
  type: 'header' | 'param';
}

const HeaderParam = ({ data, type }: Props) => {
  const { headers, setHeaders, params, setParams } = useContext(Context);
  const [name, setName] = useState(data.key);
  const [value, setValue] = useState(data.value);
  useEffect(() => {
    if (type === 'param') {
      // @ts-ignore
      setParams(
        // @ts-ignore
        params.map((param: Option) =>
          param.id === data.id ? { ...param, key: name, value } : param
        )
      );
    } else if (type === 'header') {
      // @ts-ignore
      setHeaders(
        // @ts-ignore
        headers.map((header: Option) =>
          header.id === data.id ? { ...header, key: name, value } : header
        )
      );
    }
  }, [name, value, type, data.id]);

  const deleteOption = () => {
    if (type === 'param') {
      // @ts-ignore
      setParams(params.filter((param: Option) => param.id !== data.id));
    } else if (type === 'header') {
      // @ts-ignore
      setHeaders(headers.filter((header: Option) => header.id !== data.id));
    }
  };

  return (
    <Box marginBottom='1px'>
      <Input
        variant='filled'
        width='300px'
        placeholder='Name'
        required
        type='text'
        borderRadius='0'
        height='50px'
        marginTop='10px'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        variant='filled'
        width='300px'
        placeholder='Value'
        required
        borderRadius='0'
        height='50px'
        marginTop='10px'
        value={value}
        type='text'
        onChange={(e) => setValue(e.target.value)}
      />

      <Tooltip
        openDelay={500}
        hasArrow
        label={`Remove ${type}`}
        bg='red.200'
        color='black'
        placement='right'
      >
        <Button
          height='50px'
          borderLeftRadius='0'
          colorScheme='red'
          onClick={deleteOption}
        >
          <AiFillDelete />
        </Button>
      </Tooltip>
    </Box>
  );
};

export default HeaderParam;
