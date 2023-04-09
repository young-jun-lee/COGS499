import { Box, List, ThemeIcon, Text, Checkbox, Flex } from '@mantine/core';
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
    console.log(courseGroup.length)
    return courseGroup.map((course, index) => {
      const courseName = Array.isArray(course) ? course[0] : course;
      const isCourseTaken = Array.isArray(course) ? course.some((c) => items.includes(c)) : items.includes(course);

      const textStrikeThrough = isCourseTaken ? "line-through" : "none";



      return (
        <List.Item key={courseName} style={{
          marginTop: 0,
          marginBottom: 10,
        }} >
          <Flex align="center">
            <Checkbox checked={isCourseTaken} readOnly />
            <Text
              sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : `${snap.specialization.colours?.tertiary}`,
                fontFamily: 'Greycliff CF, sans-serif',
                color: theme.colorScheme === 'dark' ? `${snap.specialization.colours?.tertiary}` : `${snap.specialization.colours?.secondary}`
              })}
              ta="center"
              fz="xl"
              fw={700}
              td={textStrikeThrough}
              style={{
                opacity: isCourseTaken ? 0.6 : 1,
                display: "inline",
                marginLeft: "0.5em",
              }}
            >
              {courseName}
            </Text>
          </Flex>
        </List.Item>
      );
    });
  }

  if (specChosen) {

    return (
      <Box
        sx={(theme) => ({
          color: `${snap.specialization.colours?.primary}`,
          padding: theme.spacing.sm,
          height: "fit-content",
          marginTop: title === "Core" ? 0 : theme.spacing.xs,
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
          width: title === "Core" ? "100%" : "48%",
        })
        }
        className="title"
      >
        <Box sx={{
          display: "flex", alignSelf: "flex-start", fontWeight: 700,
          marginLeft: title === "Core" ? "0.7em" : "0.5em", marginTop: -5, fontSize: 28,
          textShadow: "-12px - 12px 0 #000, 1px - 12px 0 #000, - 1px 1px 0 #000, 1px 1px 0 #000",
        }} >{title}</Box>
        <Box
          sx={(theme) => ({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : `${snap.specialization.colours?.tertiary}`,
            height: '190%',
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,
            width: "95%",
            marginBottom: "0.5em",
          })}
        >

          <List
            spacing="xs"
            size="md"
            center
            listStyleType="none"
            withPadding={false}
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              minHeight: 200,
              height: courseGroup.length * 18,
              justifyContent: "start",
            }}
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