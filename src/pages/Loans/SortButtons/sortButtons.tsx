const SortButtons = ({ handleSort }: { handleSort: (order: 'asc' | 'desc') => void }) => (
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
);

export default SortButtons;

