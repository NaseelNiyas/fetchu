import {
  Box,
  Flex,
  useColorModeValue,
  Stack,
  Text
} from '@chakra-ui/react';
import Settings from './Settings';

export default function Navbar() {
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Text fontSize='3xl'>FetchU</Text>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Settings />
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
