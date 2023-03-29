import { Box, List, ThemeIcon } from '@mantine/core';
import { FC } from 'react';
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
          color: `${snap.specialization.colours?.secondary}`,
          textShadow: "-12px - 12px 0 #000, 1px - 12px 0 #000, - 1px 1px 0 #000, 1px 1px 0 #000",
          textStroke: `5px ${snap.specialization.colours?.tertiary}`,
          // textShadow: `5px ${snap.specialization.colours?.tertiary}`,
          width: '30%',
          height: '100%',
          padding: theme.spacing.sm,
          marginLeft: "1px",
          marginRight: "1px",
          marginTop: theme.spacing.xs,
          marginBottom: theme.spacing.md,
          border: `5px solid ${snap.specialization.colours?.primary}`,
          borderRadius: theme.radius.md,
          boxShadow: "0 1px 1px rgba(0,0,0,0.1), 0 2px 2px rgba(0,0,0,0.1), 0 4px 4px rgba(0,0,0,0.1), 0 8px 8px rgba(0,0,0,0.1), 0 16px 16px rgba(0,0,0,0.1)",
        })}

      >
        <Box sx={{
          fontWeight: 700, marginLeft: "1px", marginTop: -5, fontSize: 22, textShadow: "-12px - 12px 0 #000, 1px - 12px 0 #000, - 1px 1px 0 #000, 1px 1px 0 #000",

        }} >{title}</Box>
        <Box
          sx={(theme) => ({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : `${snap.specialization.colours?.tertiary}`,
            height: '90%',
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,
            marginTop: theme.spacing.xs,
          })}

        >
          <List
            spacing="xs"
            size="md"
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
      </Box >
    )
  return <></>
}

export default SpecCourses