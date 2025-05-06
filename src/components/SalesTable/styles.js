export const tableStyles = {
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: 'var(--color-background)',
      color: 'var(--color-text)',
      border: '1px solid var(--color-border)'
    },
    header: {
      padding: '12px 15px',
      textAlign: 'left',
      borderBottom: '2px solid var(--color-border)',
      backgroundColor: 'var(--color-header-bg)'
    },
    cell: {
      padding: '10px 15px',
      textAlign: 'left',
      borderBottom: '1px solid var(--color-border)'
    }
  };
  
  export const filterStyles = {
    container: {
      marginBottom: '20px',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '15px',
      backgroundColor: 'var(--color-background)',
      padding: '15px',
      borderRadius: '4px',
      border: '1px solid var(--color-border)'
    },
    label: {
      fontWeight: 'bold',
      marginRight: '5px',
      color: 'var(--color-text)'
    },
    input: {
      padding: '8px',
      border: '1px solid var(--color-border)',
      borderRadius: '4px',
      minWidth: '120px',
      backgroundColor: 'var(--color-background)',
      color: 'var(--color-text)'
    },
    resetButton: {
      padding: '8px 16px',
      backgroundColor: 'var(--color-button)',
      color: 'var(--color-button-text)',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold'
    }
  };
  
  export const paginationStyles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '20px',
      gap: '5px'
    },
    button: {
      padding: '8px 12px',
      border: '1px solid var(--color-border)',
      backgroundColor: 'var(--color-secondary)',
      color: 'var(--color-text)',
      cursor: 'pointer',
      borderRadius: '4px',
      margin: '0 2px'
    },
    pageNumbers: {
      display: 'flex',
      margin: '0 10px'
    },
    activeButton: {
      backgroundColor: 'var(--color-primary)',
      color: 'var(--color-button-text)'
    }
  };
  