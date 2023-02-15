import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

function Toggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <ActionIcon
      variant="outline"
      color={dark ? 'yellow' : 'blue'}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
      
      // style={{ position: 'absolute', top: 0, right: 0, height: 40, width: 40 }}
    >
      {dark ? <MdLightMode /> : <MdDarkMode />}
    </ActionIcon>
  );
}
export default Toggle;