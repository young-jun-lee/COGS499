import { ActionIcon, Group, Switch, useMantineColorScheme } from '@mantine/core';
import { TbSun, TbMoonStars } from 'react-icons/tb';

function Toggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <Group position="right" style={{ margin: "10px" }}>
      <Switch
        size="md"
        color={colorScheme === 'dark' ? 'gray' : 'dark'}
        onChange={() => toggleColorScheme()}
        onLabel={<TbSun size={20} color={'yellow'} />}
        offLabel={<TbMoonStars size={20} color={''} />}
      />
    </Group>
  );
}
export default Toggle;