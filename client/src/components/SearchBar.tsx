import { Autocomplete, AutocompleteItem } from '@mantine/core'
import { useState } from 'react'
import { DndList } from './DragNDrop'

interface Course {
    value: string
    group: string
    courseid: string
}


function SearchBar() {
    // const [courses, setCourses] = useState([])
    const [courses, setCourses] = useState<Course[]>([]);
    const handleItemSubmit = (item: Course) => {
        // Check if item is already in courses
        if (courses.some((course) => course.courseid === item.courseid)) {
            return;
        } else {
            setCourses([...courses, item]);
        }
    };

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
                onItemSubmit={handleItemSubmit}
                sx={{ marginBottom: 20 }}
            />
            {/* <DisplaySearch courses={courses}></DisplaySearch> */}
            <DndList data={courses}></DndList>
        </>
    )
}

export default SearchBar