import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FilterSection from '../../../src/pages/Loans/FilterSection/filterSection';
import '@testing-library/jest-dom';

describe('FilterSection', () => {
    const setSelectedFilter = jest.fn();
    const handleDateFilter = jest.fn();
    const handleStatusFilter = jest.fn();
    const handleDurationFilter = jest.fn();

    const renderComponent = (selectedFilter: string) => render(
        <FilterSection
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            handleDateFilter={handleDateFilter}
            handleStatusFilter={handleStatusFilter}
            handleDurationFilter={handleDurationFilter}
            handleFilter={function (): void {
                throw new Error('Function not implemented.');
            }}
        />
    );

    it('should render default filter option', () => {
        const { getByText } = renderComponent('default');
        expect(getByText('Filtrar por:')).toBeInTheDocument();
    });

    it('should render StatusFilter when selectedFilter is status', () => {
        const { getByText } = renderComponent('status');
        expect(getByText('Todos')).toBeInTheDocument();
    });

    it('should render DurationFilter when selectedFilter is duracao', () => {
        const { getByText } = renderComponent('duracao');
        expect(getByText('Selecione')).toBeInTheDocument();
    });


    it('should call setSelectedFilter on filter change', () => {
        const { getByRole } = renderComponent('default');
        fireEvent.change(getByRole('combobox'), { target: { value: 'status' } });
        expect(setSelectedFilter).toHaveBeenCalledWith('status');
    });

    it('should call handleStatusFilter on status filter change', () => {
        const { getByText } = renderComponent('status');
        fireEvent.change(getByText('Todos').closest('select')!, { target: { value: 'Available' } });
        expect(handleStatusFilter).toHaveBeenCalledWith('Available');
    });

    it('should call handleDurationFilter on duration filter change', () => {
        const { getByText } = renderComponent('duracao');
        fireEvent.change(getByText('Selecione').closest('select')!, { target: { value: 'short' } });
        expect(handleDurationFilter).toHaveBeenCalledWith('short');
    });

});