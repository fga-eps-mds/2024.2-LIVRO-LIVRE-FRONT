import { useEffect, useState } from 'react';
import axios from 'axios';
import { NavBar } from '../../components/NavBar';

interface Emprestimo {
  status: string;
  livro: string;
  dataDeEmprestimo: string;
  dataDeDevolucao: string;
}

function HistoricoEmprestimos() {
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const [, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState<string>('default');

  const fetchEmprestimos = () => {
    axios
      .get('http://localhost:3001/emprestimos')
      .then((response) => {
        setEmprestimos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados:', error);
        setLoading(false);
      });
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

  const handleDateFilter = (startDate: Date, endDate: Date) => {
    axios
      .get('http://localhost:3001/emprestimos')
      .then((response) => {
        const filteredEmprestimos = response.data.filter((emprestimo: Emprestimo) => {
          const emprestimoDate = new Date(emprestimo.dataDeEmprestimo);
          return emprestimoDate >= startDate && emprestimoDate <= endDate;
        });
        setEmprestimos(filteredEmprestimos);
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados:', error);
      });
  };

  const handleStatusFilter = (statusValue: string) => {
    axios
      .get('http://localhost:3001/emprestimos')
      .then((response) => {
        const filteredEmprestimos = statusValue === 'Todos' ? response.data : response.data.filter((emprestimo: Emprestimo) => emprestimo.status === statusValue);
        setEmprestimos(filteredEmprestimos);
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados:', error);
      });
  };

  const handleDurationFilter = (duration: string) => {
    axios
      .get('http://localhost:3001/emprestimos')
      .then((response) => {
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
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados:', error);
      });
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
      <div>
        <div id='header' style={{ backgroundColor: '#D9D9D9', height: '15vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src="/logo.png" alt="Logo" style={{ height: '7vh' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <button
            style={{ backgroundColor: '#D9D9D9', width: '100px', borderRadius: '8px', cursor: 'pointer', marginBottom: '10px', marginRight: '10px', height: '50px' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B0B0B0'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#D9D9D9'}
            onClick={handleFilter}
          >
            Filtrar
          </button>
          <select
            style={{ backgroundColor: '#D9D9D9', width: '250px', height: '50px', borderRadius: '8px' }}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="default">Filtrar por:</option>
            <option value="status">Status do empréstimo</option>
            <option value="data">Por Data</option>
            <option value="duracao">Duração do empréstimo</option>
          </select>
          {selectedFilter === 'data' && (
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
              <input
                type="date"
                style={{ backgroundColor: '#D9D9D9', borderRadius: '8px', marginBottom: '10px' }}
                onChange={(e) => {
                  const startDate = new Date(e.target.value);
                  const endDateInput = document.getElementById('endDate') as HTMLInputElement;
                  const endDate = new Date(endDateInput.value);
                  if (endDateInput.value) {
                    handleDateFilter(startDate, endDate);
                  }
                }}
              />
              <input
                type="date"
                id="endDate"
                style={{ backgroundColor: '#D9D9D9', borderRadius: '8px' }}
                onChange={(e) => {
                  const endDate = new Date(e.target.value);
                  const startDateInput = document.querySelector('input[type="date"]') as HTMLInputElement;
                  const startDate = new Date(startDateInput.value);
                  if (startDateInput.value) {
                    handleDateFilter(startDate, endDate);
                  }
                }}
              />
            </div>
          )}
          {selectedFilter === 'status' && (
            <select
              style={{ backgroundColor: '#D9D9D9', width: '150px', height: '50px', borderRadius: '8px', marginLeft: '10px' }}
              onChange={(e) => handleStatusFilter(e.target.value)}
            >
              <option value="Todos">Todos</option>
              <option value="Em posse">Pendente</option>
              <option value="Devolvido">Devolvido</option>
            </select>
          )}
          {selectedFilter === 'duracao' && (
            <select
              style={{ backgroundColor: '#D9D9D9', width: '150px', height: '50px', borderRadius: '8px', marginLeft: '10px' }}
              onChange={(e) => handleDurationFilter(e.target.value)}
            >
              <option value="short">Até 7 dias</option>
              <option value="medium">7 a 30 dias</option>
              <option value="long">Mais de 30 dias</option>
            </select>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <button
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D9D9D9'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            onClick={() => handleSort('asc')}
          >
            <h1>⬆️</h1>
          </button>
          <button
            style={{ marginLeft: '10px' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D9D9D9'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            onClick={() => handleSort('desc')}
          >
            <h1>&#x2B07;&#xFE0F;</h1>
          </button>
        </div>

        {emprestimos.length > 0 ? (
          <>
            {emprestimos.slice((currentPage - 1) * 2, currentPage * 2).map((emprestimo) => (
              <div key={emprestimo.livro} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
                <div style={{ width: '90%', maxWidth: '500px', background: '#D9D9D9', borderRadius: '8px', position: 'relative', padding: '10px' }}>
                  <div>
                    <img src="https://marketplace.canva.com/EAE4oJOnMh0/1/0/1003w/canva-capa-de-livro-de-suspense-O7z4yw4a5k8.jpg" alt="Ícone de livro" style={{ width: '150px', height: '200px' }} />
                    <div style={{ marginLeft: '200px', top: '40px', position: 'absolute' }}>
                      <span style={{ color: 'black', fontSize: '20px', fontWeight: '400', wordWrap: 'break-word', textAlign: 'center', marginTop: '10px' }}>
                        {emprestimo.livro}
                      </span>
                      <div style={{ color: 'black', fontSize: '15px', fontWeight: '400', wordWrap: 'break-word', marginTop: '10px' }}></div>
                        Data de Empréstimo: {new Date(emprestimo.dataDeEmprestimo).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                        <br />
                        Data de Devolução: {new Date(emprestimo.dataDeDevolucao).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                      <div style={{ color: 'black', fontSize: '15px', fontWeight: '400', wordWrap: 'break-word', marginTop: '10px' }}>
                        Status: {emprestimo.status}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {emprestimos.length > 2 && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <button
                  style={{ marginRight: '10px', cursor: 'pointer', backgroundColor: '#D9D9D9', borderRadius: '8px' }}
                  onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
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
                  onClick={() => setCurrentPage((prevPage) => (emprestimos.length > prevPage * 2 ? prevPage + 1 : prevPage))}
                  disabled={currentPage * 2 >= emprestimos.length}
                >
                  Próximo
                </button>
              </div>
            )}
          </>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', width: '90%', maxWidth: '500px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'red', fontSize: '30px' }}>
            Nenhum empréstimo encontrado.
          </div>
        )}
      </div>
      <NavBar />
    </>
  );
}

export default HistoricoEmprestimos;