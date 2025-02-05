import { Box } from '@chakra-ui/react';
import { useAuth } from '../../../hooks/useAuth';
import React from 'react';
//import { useAuth } from '../../../hooks/useAuth';
// Define the Emprestimo type
type Emprestimo = {
    coverImage: string;
    title: string;
    dataDeEmprestimo: string;
    dataDeDevolucao: string;
    status: string;
    userId: string;
};




export const EmprestimosList = ({ emprestimos, currentPage, setCurrentPage }: { emprestimos: Emprestimo[], currentPage: number, setCurrentPage: React.Dispatch<React.SetStateAction<number>> }) => {
    const { getUserId } = useAuth();
    const [userId, setUserId] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchUserId = async () => {
            const id = await getUserId();
            setUserId(id);
        };
        fetchUserId();
    }, []);
    const filteredEmprestimos = emprestimos.filter(emprestimo => emprestimo.userId ===userId);
    return (
        <>
            {filteredEmprestimos.length > 0 ? (
                <Box style={{ maxHeight: '50vh' }}>
                    {filteredEmprestimos.slice((currentPage - 1) * 2, currentPage * 2).map((emprestimo) => (
                        
                        <div key={emprestimo.title} style={{ width: '300px', backgroundColor: 'lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px', margin: '10px auto', borderRadius: '8px' }}>
                            <div style={{ width: '100%', display: 'flex' }}>
                                <div>
                                    <img src={emprestimo.coverImage} alt="Ícone de livro" style={{ width: '8vw', maxWidth: '100px', maxHeight: '100px', minWidth: '60px', minHeight: '65px' }} />
                                </div>
                                <div style={{ paddingLeft: '20px' }}>
                                    <span style={{ color: 'black', fontSize: '10px', fontWeight: '400', wordWrap: 'break-word', textAlign: 'center', marginTop: '10px' }}>
                                        {emprestimo.title}
                                    </span>
                                    <div style={{ color: 'black', fontSize: '10px', fontWeight: '400', wordWrap: 'break-word', marginTop: '10px' }}>
                                        Data de Empréstimo: {new Date(emprestimo.dataDeEmprestimo).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                                        <br />
                                        Data de Devolução: {new Date(emprestimo.dataDeDevolucao).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                                    </div>
                                    <div style={{ color: 'black', fontSize: '10px', fontWeight: '400', wordWrap: 'break-word', marginTop: '10px' }}>
                                        Status: {emprestimo.status}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filteredEmprestimos.length > 2 && (
                        <CustomPagination emprestimos={filteredEmprestimos} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    )}
                </Box>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', width: '90%', maxWidth: '500px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'red', fontSize: '30px' }}>
                    Nenhum empréstimo encontrado.
                </div>
            )}
        </>
    );
};

const CustomPagination = ({ emprestimos, currentPage, setCurrentPage }: { emprestimos: Emprestimo[], currentPage: number, setCurrentPage: React.Dispatch<React.SetStateAction<number>> }) => (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button
            style={{ marginRight: '10px', cursor: 'pointer', backgroundColor: '#D9D9D9', borderRadius: '8px' }}
            onClick={() => setCurrentPage((prevPage: number) => Math.max(prevPage - 1, 1))}
            disabled={currentPage === 1}
        >
            Anterior
        </button>
        {Array.from({ length: Math.ceil(emprestimos.length / 2) }, (_, index) => (
            <button
                key={index + 1}
                style={{ margin: '0 5px', cursor: 'pointer', backgroundColor: currentPage === index + 1 ? '#B0B0B0' : '#D9D9D9', borderRadius: '8px' }}
                onClick={() => setCurrentPage(index + 1)}
            >
                {index + 1}
            </button>
        ))}
        <button
            style={{ marginLeft: '10px', cursor: 'pointer', backgroundColor: '#D9D9D9', borderRadius: '8px' }}
            onClick={() => setCurrentPage((prevPage: number) => (emprestimos.length > prevPage * 2 ? prevPage + 1 : prevPage))}
            disabled={currentPage * 2 >= emprestimos.length}
        >
            Próximo
        </button>
        </div>
    );
    
    export default EmprestimosList;