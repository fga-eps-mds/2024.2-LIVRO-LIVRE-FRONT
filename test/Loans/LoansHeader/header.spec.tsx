import React from 'react';
import { render } from '@testing-library/react';
import Header from '../../../src/pages/Loans/LoansHeader/header';
import '@testing-library/jest-dom';

describe('Header Component', () => {
    it('should render without crashing', () => {
        const { getByAltText } = render(<Header />);
        expect(getByAltText('Logo')).toBeInTheDocument();
    });

    it('should have the correct styles', () => {
        const { getByAltText } = render(<Header />);
        const logo = getByAltText('Logo');
        expect(logo).toHaveStyle('height: 7vh');
    });

    it('should have a div with the correct styles', () => {
        const { container } = render(<Header />);
        const div = container.querySelector('#header');
        expect(div).toHaveStyle('background-color: #D9D9D9');
        expect(div).toHaveStyle('height: 15vh');
        expect(div).toHaveStyle('width: 100vw');
        expect(div).toHaveStyle('display: flex');
        expect(div).toHaveStyle('justify-content: center');
        expect(div).toHaveStyle('align-items: center');
    });
});