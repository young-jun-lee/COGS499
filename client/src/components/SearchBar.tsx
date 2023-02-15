import { Autocomplete, Flex } from '@mantine/core'
import React, { useState } from 'react'
import DisplaySearch from './DisplaySearch'

function SearchBar() {
    const [courses, setCourses] = useState([
        "CISC 101", "CISC 102", "CISC 103"
    ])

    return (
        <>SearchBar
            <Autocomplete
                label="select your courses"
                placeholder="Pick one"
                data={[
                    { value: 'a', group: '1' },
                    { value: 'b', group: '2' },
                    { value: 'c', group: '2' },
                    { value: 'd', group: '2' },
                ]}
            />
            <DisplaySearch courses={courses}></DisplaySearch>
        </ >
    )
}

export default SearchBar