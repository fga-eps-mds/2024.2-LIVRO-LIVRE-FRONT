import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SortButtons from '../../../src/pages/Loans/SortButtons/sortButtons';

describe('SortButtons', () => {
    const handleSort = jest.fn();

    it('should render the sort buttons', () => {
        const { getByText } = render(<SortButtons handleSort={handleSort} />);
        expect(getByText('⬆️')).toBeInTheDocument();
        expect(getByText('⬇️')).toBeInTheDocument();
    });

    it('should call handleSort with "asc" when the first button is clicked', () => {
        const { getByText } = render(<SortButtons handleSort={handleSort} />);
        fireEvent.click(getByText('⬆️'));
        expect(handleSort).toHaveBeenCalledWith('asc');
    });

    it('should call handleSort with "desc" when the second button is clicked', () => {
        const { getByText } = render(<SortButtons handleSort={handleSort} />);
        fireEvent.click(getByText('⬇️'));
        expect(handleSort).toHaveBeenCalledWith('desc');
    });

    it('should change background color on mouse enter and leave for the first button', () => {
        const { getByText } = render(<SortButtons handleSort={handleSort} />);
        const button = getByText('⬆️').parentElement;
        if (button) {
            fireEvent.mouseEnter(button);
            expect(button).toHaveStyle('background-color: #D9D9D9');
            fireEvent.mouseLeave(button);
            expect(button).toHaveStyle('background-color: transparent');
        }
    });

    it('should change background color on mouse enter and leave for the second button', () => {
        const { getByText } = render(<SortButtons handleSort={handleSort} />);
        const button = getByText('⬇️').parentElement;
        if (button) {
            fireEvent.mouseEnter(button);
            expect(button).toHaveStyle('background-color: #D9D9D9');
            fireEvent.mouseLeave(button);
            expect(button).toHaveStyle('background-color: transparent');
        }
    });


});