import { FC } from "react";
import { useSnapshot } from "valtio";
import { state } from '../../State';
import { Box, Button, Flex, Group, Tooltip } from "@mantine/core";
import SearchBar from "./SearchBar";
import DisplaySearch from "./DisplaySearch";


const Search: FC = () => {
    const snap = useSnapshot(state);
    return (
        <Flex style={{ flexDirection: "column", width: "35%", height: "100%" }} sx={
            (theme) => ({
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
            })
        }>

            <div>Class Search</div>
            <SearchBar></SearchBar>
        </Flex>
    );
};

export default Search;