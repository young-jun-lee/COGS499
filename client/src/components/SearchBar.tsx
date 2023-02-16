import { Autocomplete } from '@mantine/core'
import { useState } from 'react'
import { DndList } from './DragNDrop'

function SearchBar() {
    const [courses, setCourses] = useState([])

    return (
        <>
            SearchBar
            <Autocomplete
                label="select your courses"
                placeholder="Pick one"
                data={[
                    { value: 'CISC 121', group: 'CISC', courseid: "1" },
                    { value: 'CISC 101', group: 'CISC', courseid: "2" },
                    { value: 'CISC 102', group: 'CISC', courseid: "3" },
                    { value: 'MATH 121', group: 'MATH', courseid: "4" },
                ]}
                onItemSubmit={(item) => {
                    // console.log(item)
                    // check if item is already in courses
                    if (courses.some((course) => course.courseid === item.courseid)) {
                        // console.log("already in courses")
                        return
                    }
                    else {
                        setCourses([...courses, item])
                    }

                }}
                sx={{ marginBottom: 20 }}
            />
            {/* <DisplaySearch courses={courses}></DisplaySearch> */}
            <DndList data={courses}></DndList>
        </>
    )
}

export default SearchBar