import { Box, Text } from '@chakra-ui/react';
import React, { FunctionComponent } from 'react';

interface ErrorProps {
	message: string;
}

const ErrorBanner: FunctionComponent<ErrorProps> = ({ message }) => {
	return (
		<Box
			id="error"
			w="100%"
			p={4}
			borderRadius="md"
			backgroundColor="tomato"
		>
			<Text color="white">🤖: {message}</Text>
		</Box>
	);
};

export default ErrorBanner;
