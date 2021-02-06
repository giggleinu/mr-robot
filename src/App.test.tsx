import { fireEvent, screen } from '@testing-library/react';

import App from './App';
import React from 'react';
import { render } from './test-utils';

test('renders Mr Robot app', () => {
    render(<App />);

	const titleElement = screen.getByText(/mr robot/i);
	expect(titleElement).toBeInTheDocument();
});

test('Command Robot to PLACE', () => {
    render(<App />);

	const inputElement = screen.getByPlaceholderText(
		/what should mr robot do?/i,
    );

    fireEvent.change(inputElement, { target: { value: 'PLACE 3,2,NORTH' } });

	const runButton = screen.getByText(/run/i);
    runButton.click();

	const commandText = screen.getByText(/PLACE 3, 2, NORTH/);
	expect(commandText).toBeInTheDocument();
});

test('Command Robot before PLACE', () => {
    render(<App />);

	const inputElement = screen.getByPlaceholderText(
		/what should mr robot do?/i,
    );

    fireEvent.change(inputElement, { target: { value: 'MOVE' } });

	const runButton = screen.getByText(/run/i);
    runButton.click();

	const errText = screen.getByText(/Not placed/);
	expect(errText).toBeInTheDocument();
});

test('Command Robot after PLACE', () => {
	render(<App />);
	const inputElement = screen.getByPlaceholderText(
		/what should mr robot do?/i,
	);

    fireEvent.change(inputElement, { target: { value: 'PLACE 3,2,WEST' } });

	const runButton = screen.getByText(/run/i);
    runButton.click();

    fireEvent.change(inputElement, { target: { value: 'MOVE' } });
    runButton.click();

    fireEvent.change(inputElement, { target: { value: 'LEFT' } });
    runButton.click();

    fireEvent.change(inputElement, { target: { value: 'MOVE' } });
    runButton.click();

    fireEvent.change(inputElement, { target: { value: 'REPORT' } });
    runButton.click();

	const commandText = screen.getByText(/CURRENT: 2, 1, SOUTH/);
	expect(commandText).toBeInTheDocument();
});

test('Command Robot to PLACE', () => {
	render(<App />);
	const inputElement = screen.getByPlaceholderText(
		/what should mr robot do?/i,
	);

    fireEvent.change(inputElement, { target: { value: 'PLACE 0,0,SOUTH' } });

	const runButton = screen.getByText(/run/i);
    runButton.click();

	fireEvent.change(inputElement, { target: { value: 'MOVE' } });
    runButton.click();

    const commandText = screen.getByText(/out of bounds/i);

	expect(commandText).toBeInTheDocument();
});

test('Invalid command', () => {
	render(<App />);
	const inputElement = screen.getByPlaceholderText(
		/what should mr robot do?/i,
	);
	expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: 'PLACE 1,2,WEST' } });

	const runButton = screen.getByText(/run/i);
    runButton.click();

	fireEvent.change(inputElement, { target: { value: 'BLAH' } });
    runButton.click();

    const commandText = screen.getByText(/invalid command/i);

	expect(commandText).toBeInTheDocument();
});

test('Invalid orienation', () => {
	render(<App />);
	const inputElement = screen.getByPlaceholderText(
		/what should mr robot do?/i,
	);
	expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: 'PLACE 1,2,UP' } });

	const runButton = screen.getByText(/run/i);
    runButton.click();

    const commandText = screen.getByText(/invalid orientation/i);

	expect(commandText).toBeInTheDocument();
});

test('Clear console and history and PLACE robot again', () => {
	render(<App />);
	const inputElement = screen.getByPlaceholderText(
		/what should mr robot do?/i,
	);

    fireEvent.change(inputElement, { target: { value: 'PLACE 2,2,EAST' } });

	const runButton = screen.getByText(/run/i);
    runButton.click();

	fireEvent.change(inputElement, { target: { value: 'MOVE' } });
    runButton.click();

	fireEvent.change(inputElement, { target: { value: 'LEFT' } });
    runButton.click();

    const resetButton = screen.getByText(/reset/i);
    resetButton.click();

    expect(inputElement).toHaveTextContent('');

    fireEvent.change(inputElement, { target: { value: 'PLACE 3,2,NORTH' } });
    runButton.click();

    expect(screen.getByText(/PLACE 3, 2, NORTH/)).toBeInTheDocument();
});

test('Enter non PLACE command with parameters', () => {
	render(<App />);
	const inputElement = screen.getByPlaceholderText(
		/what should mr robot do?/i,
	);

    fireEvent.change(inputElement, { target: { value: 'PLACE 2,2,EAST' } });

	const runButton = screen.getByText(/run/i);
    runButton.click();

	fireEvent.change(inputElement, { target: { value: 'MOVE 2,2,EAST' } });
    runButton.click();

    expect(screen.getByText(/invalid command/i)).toBeInTheDocument();
});

test('Enter rubbish command', () => {
	render(<App />);
	const inputElement = screen.getByPlaceholderText(
		/what should mr robot do?/i,
	);

    fireEvent.change(inputElement, { target: { value: 'PLACE 2,2,EAST' } });

	const runButton = screen.getByText(/run/i);
    runButton.click();

	fireEvent.change(inputElement, { target: { value: 'RUBBISH' } });
    runButton.click();

    expect(screen.getByText(/invalid command/i)).toBeInTheDocument();
});