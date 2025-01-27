const FilterSection = ({ selectedFilter, setSelectedFilter, handleDateFilter, handleStatusFilter, handleDurationFilter }: { selectedFilter: string, setSelectedFilter: React.Dispatch<React.SetStateAction<string>>, handleFilter: () => void, handleDateFilter: (startDate: Date, endDate: Date) => void, handleStatusFilter: (statusValue: string) => void, handleDurationFilter: (duration: string) => void }) => (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', flexWrap: 'wrap' }}>
        <select
            style={{ backgroundColor: '#D9D9D9', width: '100px', height: '30px', borderRadius: '8px' }}
            onChange={(e) => setSelectedFilter(e.target.value)}
        >
            <option value="default">Filtrar por:</option>
            <option value="status">Status do empréstimo</option>
            <option value="data">Por Data</option>
            <option value="duracao">Duração do empréstimo</option>
        </select>
        {selectedFilter === 'data' && (
            <DateFilter handleDateFilter={handleDateFilter} />
        )}
        {selectedFilter === 'status' && (
            <StatusFilter handleStatusFilter={handleStatusFilter} />
        )}
        {selectedFilter === 'duracao' && (
            <DurationFilter handleDurationFilter={handleDurationFilter} />
        )}
    </div>
);

const StatusFilter = ({ handleStatusFilter }: { handleStatusFilter: (statusValue: string) => void }) => (
    <select
        style={{ backgroundColor: '#D9D9D9', width: '100px', height: '30px', borderRadius: '8px', marginLeft: '10px' }}
        onChange={(e) => handleStatusFilter(e.target.value)}
    >
        <option value="Todos">Todos</option>
        <option value="Em posse">Pendente</option>
        <option value="Devolvido">Devolvido</option>
    </select>
);

const DurationFilter = ({ handleDurationFilter }: { handleDurationFilter: (duration: string) => void }) => (
        <select
                style={{ backgroundColor: '#D9D9D9', width: '100px', height: '30px', borderRadius: '8px', marginLeft: '10px' }}
                onChange={(e) => handleDurationFilter(e.target.value)}  
     >
                <option value="">Selecione</option>
                <option value="short">Curto</option>
                <option value="medium">Médio</option>
                <option value="long">Longo Prazo</option>
        </select>
);
const DateFilter = ({ handleDateFilter }: { handleDateFilter: (startDate: Date, endDate: Date) => void }) => (
    <div style={{width:'120px',paddingLeft: '10px' }}>
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
);

export default FilterSection;
