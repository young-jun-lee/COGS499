import { ColorScheme, ColorSchemeProvider, Container, Flex, MantineProvider } from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';
import Toggle from './components/DarkMode';
import FlowContainer from './components/Flow/FlowContainer';
import Header from './components/Requirements/Header';
import Requirements from './components/Requirements/Requirements';
import SelectContainer from './components/SelectCourses/SelectCoursesContainer';
import HeaderContent from './content/Header';
import "./styles.css";

export default function App() {


  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });


  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log(entry);
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  });

  const hiddenElements = document.querySelectorAll(".hidden");


  hiddenElements.forEach((element) => {
    observer.observe(element);
  });


  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme, fontFamily: 'Inter, sans-serif', }} withGlobalStyles withNormalizeCSS >
        <NotificationsProvider>
          <Container size="lg" px="lg">
            <Flex style={{ height: "60%", flexDirection: "column" }} className="hidden">
              <Toggle />
              <Header title={HeaderContent.title} />
              <Requirements subheading1={HeaderContent.subheading1} subheading2={HeaderContent.subheading2} subheading3={HeaderContent.subheading3} />

            </Flex>
            <Flex style={{ height: "60%" }} className="hidden">
              <SelectContainer />
              {/* <Search /> */}

            </Flex>
            <Flex style={{ height: "60%" }} className="hidden">
              <FlowContainer />
              {/* <Search /> */}

            </Flex>
          </Container>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>

  );
}