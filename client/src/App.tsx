import { ColorScheme, ColorSchemeProvider, Container, Flex, MantineProvider } from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';
import { useState } from 'react';
import { GridContextProvider, GridDropZone, GridItem, swap } from 'react-grid-dnd';
import Toggle from './components/DarkMode';
import { DND } from './components/DND';
import FlowContainer from './components/Flow/FlowContainer';
import Header from './components/Requirements/Header';
import Requirements from './components/Requirements/Requirements';
import SelectContainer from './components/SelectCourses/SelectCoursesContainer';
import HeaderContent from './content/Header';
import "./styles.css"
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
        <NotificationsProvider>
          <Container size="lg" px="lg">
            <Flex style={{ height: "60%", flexDirection: "column" }}>
              <Toggle />
              <Header title={HeaderContent.title} />
              <Requirements subheading={HeaderContent.subheading} />
            </Flex>
            <Flex style={{ height: "60%" }}>
              <SelectContainer />
              {/* <Search /> */}
            </Flex>
            <Flex style={{ height: "60%" }}>
              {/* <FlowContainer /> */}
              {/* <Search /> */}

            </Flex>
          </Container>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>

  );
}