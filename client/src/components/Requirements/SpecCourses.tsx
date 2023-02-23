import { Box } from '@mantine/core';
import { FC } from 'react';

interface RequiredCourses {
  title: string;
}

const SpecCourses: FC<RequiredCourses> = ({ title }) => {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? "#e5deed" : theme.colors.gray[1],
        // textAlign: 'center',
        width: '100%',
        height: '100%',
        padding: theme.spacing.sm,
        marginLeft: "1px",
        marginRight: "1px",
        marginTop: theme.spacing.md,
        marginBottom: theme.spacing.md,

        borderRadius: `${theme.radius.md} ${theme.radius.md} 0 0`,
      })}
    >
      <Box sx={{ fontWeight: 700, marginLeft: "1px", marginTop: -5 }}>{title}</Box>
      <Box
        sx={(theme) => ({
          backgroundColor: '#ede8f3',
          height: '90%',
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[5],
          },
        })}

      >
        <li>
          CISC 101
        </li>
        <li>
          CISC 102
        </li>
        <li>
          CISC 103
        </li>
      </Box>
    </Box>
  )
}

export default SpecCourses