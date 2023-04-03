import { Box, List, ThemeIcon, Text } from '@mantine/core';
import { FC, useEffect, useMemo, useState } from 'react';
import { TbCircleCheck, TbCircleDashed } from "react-icons/tb";
import { useSnapshot } from 'valtio';
import { state } from '../../Valtio/State';
import HeaderContent from "../../content/Header";
import { Course, CourseColumns } from '../../types/stateTypes';

interface RequiredCourses {
  title: string;
  specChosen: boolean;
  courseGroup: any[];
}

const SpecCourses: FC<RequiredCourses> = ({ title, specChosen, courseGroup }) => {

  const snap = useSnapshot(state)
  const items: any = []
  for (let column of Object.keys(snap.currentBasket) as any) {
    // skip the first column and any empty columns
    if (column === "0" || snap.currentBasket[column].length === 0) {
      continue
    }

    for (let item of Object.keys(snap.currentBasket[column]) as any) {
      let course = snap.currentBasket[column][item]
      let parsedCourse: Course = JSON.parse(JSON.stringify(course))
      const value = parsedCourse.value
      items.push(value)
    }
  }
  const renderCourses = () => {
    return courseGroup.map((course, index) => {
      const courseName = Array.isArray(course) ? course[0] : course;
      const isCourseTaken = Array.isArray(course) ? course.some((c) => items.includes(c)) : items.includes(course);

      const icon = isCourseTaken ? (
        <ThemeIcon size={24} radius="xl" color="green">
          <TbCircleCheck size={16} />
        </ThemeIcon>
      ) : null;

      return (
        <List.Item key={courseName} icon={icon}>
          {courseName}
        </List.Item>
      );
    });
  }

  if (specChosen) {

    return (
      <Box
        sx={(theme) => ({
          color: `${snap.specialization.colours?.secondary}`,
          textShadow: "-12px - 12px 0 #000, 1px - 12px 0 #000, - 1px 1px 0 #000, 1px 1px 0 #000",
          textStroke: `5px ${snap.specialization.colours?.tertiary}`,
          width: title==="Core" ? "33%" : "90%",
          height: '100%',
          padding: theme.spacing.sm,

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
          fontWeight: 700, marginLeft: "1px", marginTop: -5, fontSize: 26, textShadow: "-12px - 12px 0 #000, 1px - 12px 0 #000, - 1px 1px 0 #000, 1px 1px 0 #000",
        }} >{title}</Box>
        <Box
          sx={(theme) => ({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : `${snap.specialization.colours?.tertiary}`,
            height: '90%',
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,
            marginTop: theme.spacing.xs,
            width: "95%",
          })}
        >

          <List
            spacing="xs"
            size="md"
            center
            icon={
              <ThemeIcon color="yellow" size={24} radius="xl">
                <TbCircleDashed size={16} />
              </ThemeIcon>
            }
          >

            {renderCourses()}

          </List>
        </Box>
      </Box >
    )
  }
  return <></>
}

export default SpecCourses