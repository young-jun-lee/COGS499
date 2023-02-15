import { FC } from "react";
import { useSnapshot } from "valtio";
import { state } from '../State';
import { Button, Flex, Group, Tooltip } from "@mantine/core";
import SearchBar from "./SearchBar";
import DisplaySearch from "./DisplaySearch";


const Search: FC = () => {
    const snap = useSnapshot(state);
    return (
        <Flex style={{ flexDirection: "column", width: "50%" }}>
            <div>Class Search</div>
            <SearchBar></SearchBar>
            <DisplaySearch></DisplaySearch>
        </Flex>
    );
};

export default Search;