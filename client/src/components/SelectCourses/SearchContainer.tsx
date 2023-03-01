import { FC } from "react";
import { useSnapshot } from "valtio";
import { state } from '../../Valtio/State';
import { Box, Button, Flex, Group, Tooltip } from "@mantine/core";
import SearchBar from "./SearchBar";
import DisplaySearch from "./DisplaySearch";

type SearchContainerProps = {
    columnId: string;
    column: any;
};

const Search: FC<SearchContainerProps> = ({ columnId, column }) => {
    const snap = useSnapshot(state);
    return (
        <Flex style={{ flexDirection: "column" }} sx={
            (theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? "#e5deed" : theme.colors.gray[1],
                width: '100%',
                padding: theme.spacing.sm,
                borderRadius: `${theme.radius.md} ${theme.radius.md} 0 0`,
            })
        }>

            <Box sx={{ fontWeight: 700, marginLeft: "1px", marginTop: -5 }}>Class Search</Box>
            <SearchBar columnId={columnId} column={column}></SearchBar>
        </Flex>
    );
};

export default Search;