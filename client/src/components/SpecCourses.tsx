import { Box } from '@mantine/core'
import { FC } from 'react'

interface RequiredCourses {
	title: string;
}

const SpecCourses: FC<RequiredCourses> = ({title}) => {
  return (
    <Box>
        <Box>

        {title}
        </Box>
        <Box>
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