import { Box, List, ThemeIcon, Text } from '@mantine/core';
import { FC, useEffect, useMemo, useState } from 'react';
import { TbCircleCheck, TbCircleDashed } from "react-icons/tb";
import { useSnapshot } from 'valtio';
import { state } from '../../Valtio/State';
import HeaderContent from "../../content/Header";

interface RequiredCourses {
  title: string;
  specChosen: boolean;
  courseGroup: string;
}

const SpecCourses: FC<RequiredCourses> = ({ title, specChosen, courseGroup }) => {
  const snap = useSnapshot(state)


  if (specChosen)
    return (
      <Box
        sx={(theme) => ({
          color: `${snap.specialization.colours?.secondary}`,
          textShadow: "-12px - 12px 0 #000, 1px - 12px 0 #000, - 1px 1px 0 #000, 1px 1px 0 #000",
          textStroke: `5px ${snap.specialization.colours?.tertiary}`,
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
          "--fillColor": theme.colorScheme === 'dark' ? `${snap.specialization.colours?.primary}` : `${snap.specialization.colours?.secondary}`,
          "--bgColor": theme.colorScheme === 'dark' ? theme.colors.dark[6] : `white`,
          "--hoverText": theme.colorScheme === 'dark' ? `${snap.specialization.colours?.tertiary}` : "#FFF",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        })}
        className="title"
      >
        <Box sx={{
          fontWeight: 700, marginLeft: "1px", marginTop: -5, fontSize: 22, textShadow: "-12px - 12px 0 #000, 1px - 12px 0 #000, - 1px 1px 0 #000, 1px 1px 0 #000",
        }} >{title}</Box>
        <Box
          sx={(theme) => ({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : `${snap.specialization.colours?.tertiary}`,
            height: '90%',
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,
            marginTop: theme.spacing.xs,
            width: "90%",
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
            <>
              {HeaderContent[courseGroup].map((course, index) => {
                return <List.Item key={index}>{course}</List.Item>
              })
              }
            </>
            <List.Item>CISC 101</List.Item>
            <List.Item icon={
              <ThemeIcon size={24} radius="xl">
                <TbCircleDashed size={16} />
              </ThemeIcon>
            }>CISC 102</List.Item>

          </List>
        </Box>
      </Box >
    )
  return <></>
}

export default SpecCourses