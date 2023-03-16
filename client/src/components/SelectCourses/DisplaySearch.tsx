import { Box, Flex } from '@mantine/core';
import React, { FC } from 'react'

interface DisplayCoursesProps {
  courses: string[]
}


const DisplaySearch: FC<DisplayCoursesProps> = ({ courses }) => {

  return (
    <Flex style={{ flexDirection: "column", width: "90%", height: "100%" }} sx={
      (theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? "#e5deed" : "red",
        alignItems: 'center',
        marginTop: theme.spacing.md,
      })
    }>
      {courses.map((course) => {
        return (
          <Box
            sx={(theme) => ({
              backgroundColor: theme.colorScheme === 'dark' ? "#e5deed" : theme.colors.gray[1],
              textAlign: 'center',
              width: '50%',
              padding: theme.spacing.xs,
              // marginLeft: "1px",
              // marginRight: "1px",
              marginTop: theme.spacing.xs,
              marginBottom: theme.spacing.xs,

              borderRadius: `${theme.radius.md} ${theme.radius.md} 0 0`,
            })}
          >{course}</Box>
        )
      })
      }


    </Flex>
  );
};

export default DisplaySearch;