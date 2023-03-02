import { FC } from "react";
import { Box } from '@mantine/core';


interface Header {
	title: string;
}

const Header: FC<Header> = ({ title }) => {

	return (
		<Box
			sx={(theme) => ({
				backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : "#002452",
				textAlign: 'center',
				padding: theme.spacing.xl,
				borderRadius: theme.radius.sm,
				// '&:hover': {
				// 	backgroundColor:
				// 		theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
				// },
				border: '3px solid #B90E31',
			})}
		>
			<Box sx={(theme) => ({ fontWeight: 700, fontSize: 30, color: theme.colorScheme === 'dark' ? theme.colors.dark[6] : "#F3CA40", })}>{title}</Box>
		</Box >
	);
};

export default Header;