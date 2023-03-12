import { Box, Card, Image, Text, Group, Badge, Button } from '@mantine/core';
import { FC } from 'react';
import { List, ThemeIcon } from '@mantine/core';
import { TbCircleCheck, TbCircleDashed } from "react-icons/tb";
import { useSnapshot } from 'valtio';
import { state } from '../../Valtio/State';

interface RequiredCourses {
  title: string;
  specChosen: boolean;
}

const SpecCourses: FC<RequiredCourses> = ({ title, specChosen }) => {
  const snap = useSnapshot(state)
  if (specChosen)
    return (
      <Box
        sx={(theme) => ({
          color: `${snap.specialization.colours?.primary}`,
          width: '60%',
          height: '100%',
          padding: theme.spacing.sm,
          marginLeft: "1px",
          marginRight: "1px",
          marginTop: theme.spacing.md,
          marginBottom: theme.spacing.md,
          border: `5px solid ${snap.specialization.colours?.primary}`,
          borderRadius: theme.radius.md,
        })}
      >
        <Box sx={{ fontWeight: 700, marginLeft: "1px", marginTop: -5, fontSize: 18 }}>{title}</Box>
        <Box
          sx={(theme) => ({
            backgroundColor: `${snap.specialization.colours?.tertiary}`,
            height: '90%',
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,
          })}

        >
          <List
            spacing="xs"
            size="sm"
            center
            icon={
              <ThemeIcon color="teal" size={24} radius="xl">
                <TbCircleCheck size={16} />
              </ThemeIcon>
            }
          >
            <List.Item>CISC 101</List.Item>
            <List.Item icon={
              <ThemeIcon size={24} radius="xl">
                <TbCircleDashed size={16} />
              </ThemeIcon>
            }>CISC 102</List.Item>
            <List.Item icon={
              <ThemeIcon size={24} radius="xl">
                <TbCircleDashed size={16} />
              </ThemeIcon>
            }>CISC 103</List.Item>
            <List.Item icon={
              <ThemeIcon size={24} radius="xl">
                <TbCircleDashed size={16} />
              </ThemeIcon>
            }>CISC 104</List.Item>
            <List.Item
              icon={
                <ThemeIcon size={24} radius="xl">
                  <TbCircleDashed size={16} />
                </ThemeIcon>
              }
            >
              CISC 105
            </List.Item>
          </List>
        </Box>
      </Box>
      // <Card shadow="sm" padding="lg" radius="md" withBorder>


      //   <Group position="apart" mt="md" mb="xs">
      //     <Text weight={500}>Norway Fjord Adventures</Text>
      //     <Badge color="pink" variant="light">
      //       On Sale
      //     </Badge>
      //   </Group>

      //   <Text size="sm" color="dimmed">
      //     With Fjord Tours you can explore more of the magical fjord landscapes with tours and
      //     activities on and around the fjords of Norway
      //   </Text>

      //   <Button variant="light" color="blue" fullWidth mt="md" radius="md">
      //     Book classic tour now
      //   </Button>
      // </Card>
    )
  return <></>
}

export default SpecCourses