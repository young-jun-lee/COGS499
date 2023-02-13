import { ColorScheme, ColorSchemeProvider, Container, MantineProvider } from '@mantine/core';
import Header from './components/Header';
import Toggle from './components/DarkMode';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';

export default function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });
  
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  
  useHotkeys([['mod+J', () => toggleColorScheme()]]);
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{colorScheme}}>
      <Container size="lg" px="lg">
        <Toggle />
        <Header title="Hitchhiker's Guide to Computing Degree Plans" />
      </Container>
      {/* <Text>Welcome to Mantine!</Text> */}
    </MantineProvider>
    </ColorSchemeProvider>

  );
}