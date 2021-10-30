import { useColorMode } from '@chakra-ui/color-mode';
import { AiFillDelete } from 'react-icons/ai';
import {
  BsFillGearFill,
  BsCheck,
  BsFillMoonFill,
  BsFillLockFill,
} from 'react-icons/bs';
import { IoColorPalette } from 'react-icons/io5';
import { SiAiohttp,  } from 'react-icons/si';
import {AiOutlinePlus} from 'react-icons/ai';
import {
  Button,
  Select,
  Drawer,
  Text,
  DrawerOverlay,
  IconButton,
  DrawerContent,
  Switch,
  DrawerHeader,
  DrawerFooter,
  DrawerBody,
  DrawerCloseButton,
  useDisclosure,
  Box,
  Tooltip,
  Input,
} from '@chakra-ui/react';
import { SettingsContext } from 'context/Settings';
import { useContext } from 'react';
import { createId } from 'utils';

const Settings = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    accentColor,
    setAccentColor,
    defaultHTTP,
    setDefaultHTTP,
    envVars,
    setEnvVars,
  } = useContext(SettingsContext);
  const toggleHTTPPrefix = () => {
    const prev = defaultHTTP;
    setDefaultHTTP(!prev);
  };

  const changeEnvVars = (id: string, key: string, val: string) => {
    setEnvVars(
      envVars.map((item) =>
        item.id === id ? { ...item, name: key, value: val } : item
      )
    );
  };

  const deleteEnvVar = (id: string) => {
    setEnvVars(envVars.filter((item) => item.id !== id));
  };

  const newEnvVar = () => {
    setEnvVars([
      ...envVars,
      {
        id: createId(10),
        name: '',
        value: '',
      },
    ]);
  };

  return (
    <>
      <Button onClick={onOpen}>
        <BsFillGearFill />
      </Button>
      <Drawer isOpen={isOpen} onClose={onClose} size='lg'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <Text fontSize='2xl'>Settings</Text>
          </DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody>
            <Box display='flex' gridGap='5' marginTop='5' marginBottom='5'>
              <BsFillMoonFill />
              <Text fontSize='2xl'>Dark Mode</Text>
              <Switch
                onChange={toggleColorMode}
                size='lg'
                defaultChecked={colorMode === 'dark'}
                aria-label='Yes'
                colorScheme={accentColor}
              ></Switch>
            </Box>
            <hr />
            <Box marginTop='5'>
              <Text fontSize='2xl'>
                <IoColorPalette />
                Accent Color
              </Text>

              <Select
                value={accentColor}
                variant='filled'
                onChange={(e) => setAccentColor(e.target.value)}
              >
                <option value='purple'>Purple</option>
                <option value='pink'>Pink</option>
                <option value='green'>Green</option>
                <option value='orange'>Orange</option>
                <option value='yellow'>Yellow</option>
                <option value='red'>Red</option>
                <option value='blue'>Blue</option>
                <option value='cyan'>Cyan</option>
              </Select>
            </Box>
            <hr />
            <Box display='flex' gridGap='5' marginTop='5' marginBottom='5'>
              <Text fontSize='2xl'>
                <SiAiohttp />
                Prefix URL with HTTP on Load
              </Text>
              <Switch
                onChange={toggleHTTPPrefix}
                size='lg'
                defaultChecked={!defaultHTTP}
                aria-label='Yes'
                colorScheme={accentColor}
              ></Switch>
            </Box>
            <Box gridGap='5' marginTop='5' marginBottom='5'>
              <Text fontSize='2xl'>
                <BsFillLockFill />
                Env Variables
              </Text>
              {envVars.map((envVar) => (
                <Box marginBottom='1px' display='flex' key={envVar.id}>
                  <Input
                    variant='filled'
                    width='300px'
                    placeholder='Name'
                    required
                    type='url'
                    borderRadius='0'
                    height='50px'
                    marginTop='10px'
                    value={envVar.name}
                    onChange={(e) =>
                      changeEnvVars(envVar.id, e.target.value, envVar.value)
                    }
                  />
                  <Input
                    variant='filled'
                    width='300px'
                    placeholder='Value'
                    required
                    type='url'
                    borderRadius='0'
                    height='50px'
                    marginTop='10px'
                    value={envVar.value}
                    onChange={(e) =>
                      changeEnvVars(envVar.id, envVar.name, e.target.value)
                    }
                  />
                  <Tooltip
                    hasArrow
                    label='Remove Variable'
                    bg='red.200'
                    color='black'
                    placement='right'
                    openDelay={500}
                  >
                    <Button
                      height='50px'
                      borderLeftRadius='0'
                      colorScheme='red'
                      marginTop='10px'
                      onClick={() => deleteEnvVar(envVar.id)}
                    >
                      <AiFillDelete />
                    </Button>
                  </Tooltip>
                </Box>
              ))}
              <Tooltip hasArrow label="Create a new Variable" bg={`${accentColor}.200`} openDelay={500}>
              <IconButton
                colorScheme={accentColor}
                aria-label='Search database'
                icon={<AiOutlinePlus />}
                marginTop='10px'
                onClick={newEnvVar}
              />
              </Tooltip>
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button colorScheme={accentColor} mr={3} onClick={onClose}>
              <BsCheck /> Done
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Settings;
