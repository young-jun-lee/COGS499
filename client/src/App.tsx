import { Box, ColorScheme, ColorSchemeProvider, Container, Flex, MantineProvider } from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import Toggle from './components/DarkMode';
import Header from './components/Header';
import Requirements from './components/Requirements';
import Years from './components/YearsContainer';
import HeaderContent from './content/Header';
import Search from './components/SearchContainer';
import { DndList } from './components/DragNDrop';

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
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme }}>
        <Container size="lg" px="lg">
          <Flex style={{ height: "60%", flexDirection: "column" }}>

            <Toggle />

            <Header title={HeaderContent.title} />
            <Requirements />
          </Flex>
          <Flex style={{ height: "60%" }}>
            <Years />
            <Search />
          </Flex>
        </Container>
      </MantineProvider>
    </ColorSchemeProvider>

  );
}