export const formatPhoneNumber = (value :string) => {
    // Remove tudo que não for número
    const onlyNumbers = value.replace(/\D/g, '');
    
    // Aplica a formatação
    if (onlyNumbers.length <= 2) return `(${onlyNumbers}`;
    if (onlyNumbers.length <= 6) return `(${onlyNumbers.slice(0, 2)}) ${onlyNumbers.slice(2)}`;
    return `(${onlyNumbers.slice(0, 2)}) ${onlyNumbers.slice(2, 7)}-${onlyNumbers.slice(7, 11)}`;
};

export default formatPhoneNumber