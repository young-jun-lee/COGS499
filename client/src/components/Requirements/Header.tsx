import { FC } from "react";
import { Box } from '@mantine/core';
import { useSnapshot } from "valtio";
import { state } from '../../State';

interface Header {
	title: string;
}

const Header: FC<Header> = (props) => {
	const snap = useSnapshot(state);
	return (
		<Box
			sx={(theme) => ({
				backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
				textAlign: 'center',
				padding: theme.spacing.xl,
				borderRadius: theme.radius.md,
				'&:hover': {
					backgroundColor:
						theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
				},
			})}
		>
			<div className='banner-text'>{props.title}</div>
			<div>{snap.specialization}</div>
		</Box>
	);
};

export default Header;