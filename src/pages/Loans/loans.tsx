import { useEffect, useState } from 'react';
import axios from 'axios';
import { NavBar } from '../../components/NavBar';
import Header from './LoansHeader/header';
import FilterSection from './FilterSection/filterSection';
import SortButtons from './SortButtons/sortButtons';
import EmprestimosList from './EmprestimosList/emprestimoslist';

interface Emprestimo {
    coverImage: string ;
    title: string;
    status: string;
    livro: string;
    userId: string;
    dataDeEmprestimo: string;
    dataDeDevolucao: string;
}

function Loans() {
    const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedFilter, setSelectedFilter] = useState<string>('default');

    const fetchEmprestimos = async () => {
        try {
            const response = await axios.get('http://localhost:3001/books/search');
            setEmprestimos(response.data);
        } catch (error) {
            console.error('Erro ao buscar os dados:', error);
        }
    };

    useEffect(() => {
        fetchEmprestimos();
    }, []);

    useEffect(() => {
        fetchEmprestimos();
    }, [selectedFilter]);

    const handleFilter = () => {
        const selectElement = document.querySelector('select');
        const filterValue = selectElement?.value;
        const filteredEmprestimos = [...emprestimos];

        if (filterValue === 'data') {
            filteredEmprestimos.sort((a, b) => new Date(a.dataDeEmprestimo).getTime() - new Date(b.dataDeEmprestimo).getTime());
        } else if (filterValue === 'status') {
            filteredEmprestimos.sort((a, b) => a.status.localeCompare(b.status));
        } else if (filterValue === 'duracao') {
            filteredEmprestimos.sort((a, b) => {
                const duracaoA = new Date(a.dataDeDevolucao).getTime() - new Date(a.dataDeEmprestimo).getTime();
                const duracaoB = new Date(b.dataDeDevolucao).getTime() - new Date(b.dataDeEmprestimo).getTime();
                return duracaoA - duracaoB;
            });
        }

        setEmprestimos(filteredEmprestimos);
    };

    const handleDateFilter = async (startDate: Date, endDate: Date) => {
        try {
            const response = await axios.get('http://localhost:3001/books/search');
            const filteredEmprestimos = response.data.filter((emprestimo: Emprestimo) => {
                const emprestimoDate = new Date(emprestimo.dataDeEmprestimo);
                return emprestimoDate >= startDate && emprestimoDate <= endDate;
            });
            setEmprestimos(filteredEmprestimos);
        } catch (error) {
            console.error('Erro ao buscar os dados:', error);
        }
    };

    const handleStatusFilter = async (statusValue: string) => {
        try {
            const response = await axios.get('http://localhost:3001/books/search');
            const filteredEmprestimos = statusValue === 'Todos' ? response.data : response.data.filter((emprestimo: Emprestimo) => emprestimo.status === statusValue);
            setEmprestimos(filteredEmprestimos);
        } catch (error) {
            console.error('Erro ao buscar os dados:', error);
        }
    };

    const handleDurationFilter = async (duration: string) => {
        try {
            const response = await axios.get('http://localhost:3001/books/search');
            const filteredEmprestimos = response.data.filter((emprestimo: Emprestimo) => {
                const duracao = (new Date(emprestimo.dataDeDevolucao).getTime() - new Date(emprestimo.dataDeEmprestimo).getTime()) / (24 * 60 * 60 * 1000); // duration in days
                if (duration === 'short') {
                    return duracao <= 7; // 7 days
                } else if (duration === 'medium') {
                    return duracao > 7 && duracao <= 30; // 7-30 days
                } else if (duration === 'long') {
                    return duracao > 30; // more than 30 days
                }
                return true;
            });
            setEmprestimos(filteredEmprestimos);
        } catch (error) {
            console.error('Erro ao buscar os dados:', error);
        }
    };

    const handleSort = (order: 'asc' | 'desc') => {
        const sortedEmprestimos = [...emprestimos].sort((a, b) => {
            const dateA = new Date(a.dataDeEmprestimo).getTime();
            const dateB = new Date(b.dataDeEmprestimo).getTime();
            return order === 'asc' ? dateA - dateB : dateB - dateA;
        });
        setEmprestimos(sortedEmprestimos);
    };

    return (
        <>
            <div style={{ maxWidth: '100vw', display: 'stati', flexDirection: 'column', alignItems: 'center' }}>
                <Header />
                <FilterSection
                    selectedFilter={selectedFilter}
                    setSelectedFilter={setSelectedFilter}
                    handleFilter={handleFilter}
                    handleDateFilter={handleDateFilter}
                    handleStatusFilter={handleStatusFilter}
                    handleDurationFilter={handleDurationFilter}
                />
                <SortButtons handleSort={handleSort} />
                <EmprestimosList emprestimos={emprestimos} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>
            <NavBar />
        </>
    );
}
export default Loans;