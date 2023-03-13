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
          width: '30%',
          height: '100%',
          padding: theme.spacing.sm,
          marginLeft: "1px",
          marginRight: "1px",
          marginTop: theme.spacing.md,
          marginBottom: theme.spacing.md,
          border: `5px solid ${snap.specialization.colours?.primary}`,
          borderRadius: theme.radius.md,
          boxShadow: "0 1px 1px rgba(0,0,0,0.1), 0 2px 2px rgba(0,0,0,0.1), 0 4px 4px rgba(0,0,0,0.1), 0 8px 8px rgba(0,0,0,0.1), 0 16px 16px rgba(0,0,0,0.1)"
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
    )
  return <></>
}

export default SpecCourses