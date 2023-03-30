import { FC } from "react";
import { Box, Image } from '@mantine/core';
import coat from '../../assets/coat.png';


interface Header {
	title: string;
}

const Header: FC<Header> = ({ title }) => {
	return (

		<>
			<Box
				sx={(theme) => ({
					backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : "#002452",
					textAlign: 'center',
					padding: theme.spacing.xs,
				})}
			>
				<Box sx={(theme) => ({ fontWeight: 700, fontSize: 35, color: "white", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around" })}>
					<Image maw={75} src={coat}></Image>{title}<Image maw={75} src={coat}></Image>
				</Box>
			</Box >
			<div style={{
				width: "100%",
				height: "8px",
				zIndex: "9",
				background: "linear-gradient(to right, #fabd0f 50%, #b90e31 50%)",
			}}></div></>
	);
};

export default Header;