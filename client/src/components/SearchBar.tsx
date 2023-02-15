import { Autocomplete } from '@mantine/core'
import React from 'react'

function SearchBar() {
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
        </>
    )
}

export default SearchBar