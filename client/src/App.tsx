import { useAutoAnimate } from '@formkit/auto-animate/react';
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
import { useEffect } from 'react';
import { getCourses } from "./services/getCourses"
import { useSnapshot } from 'valtio';
import { state } from './Valtio/State';
// import { useAutoAnimate } from '@formkit/auto-animate/react'
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

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);


  hiddenElements.forEach((element) => {
    observer.observe(element);
  });

  const snap = useSnapshot(state);

  useEffect(() => {
    const specialization = (localStorage.getItem('specialization') != null) ? localStorage.getItem('specialization') : "";
    if (specialization) {
      // get courses
      const parsedSpec = JSON.parse(specialization).name
      console.log(specialization)
      console.log(parsedSpec)
      const courses = getCourses(parsedSpec);
      console.log(courses)
    }

  }, [snap.specialization])



  const [parent] = useAutoAnimate()

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme, fontFamily: 'Inter, sans-serif', }} withGlobalStyles withNormalizeCSS >
        <NotificationsProvider>
          <Container size="lg" px="lg" ref={parent}>
            <Flex style={{ height: "60%", flexDirection: "column" }}>
              <Header title={HeaderContent.title} />


              <Requirements subheading1={HeaderContent.subheading1} subheading2={HeaderContent.subheading2} subheading3={HeaderContent.subheading3} />
            </Flex>
            <Flex style={{ height: "60%", marginTop: "50px" }}>
              <SelectContainer />
            </Flex>
            <Flex style={{ height: "60%", marginTop: "50px", marginBottom: "50px" }}>
              <FlowContainer />
            </Flex>
          </Container>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>

  );
}