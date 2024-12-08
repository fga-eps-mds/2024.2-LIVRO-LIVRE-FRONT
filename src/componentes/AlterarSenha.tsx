import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { CiLock } from 'react-icons/ci';  // Ícone de cadeado
import './AlterarSenha.css';

function AlterarSenha() {
    const [senha, setInputSenha] = useState('');
    const [confirmacaoSenha, setInputConfirmacaoSenha] = useState('');
    const [confirmacao, setConfirmacao] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmacaoSenha, setMostrarConfirmacaoSenha] = useState(false);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!senha || !confirmacaoSenha) {
            setConfirmacao("Por favor, preencha ambos os campos.");
            return;
        }
        if (senha === confirmacaoSenha) {
            setConfirmacao("Senhas confirmadas com sucesso!");
        } else {
            setConfirmacao("As senhas não coincidem.");
        }
    };

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setter(e.target.value);
            setConfirmacao(""); // Limpa a mensagem de confirmação ao alterar qualquer input
        };

    return (
        <>
            <div className='infos'>
                <h3>Nova senha</h3>
                <p>Deseja criar uma nova senha? Insira sua nova senha e confirme-a.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="input-icon-container">
                    <CiLock className="lock-icon" />
                    <input
                        id='senha'
                        type={mostrarSenha ? 'text' : 'password'}
                        value={senha}
                        onChange={handleInputChange(setInputSenha)}
                        placeholder='Nova Senha'
                    />
                    <div
                        className="eye-icon"
                        onClick={() => setMostrarSenha(!mostrarSenha)}
                    >
                        {mostrarSenha ? <FaRegEyeSlash /> : <FaRegEye />}
                    </div>
                </div>
                <div className="input-icon-container">
                    <CiLock className="lock-icon" />
                    <input
                        id='confirmacaoSenha'
                        type={mostrarConfirmacaoSenha ? 'text' : 'password'}
                        value={confirmacaoSenha}
                        onChange={handleInputChange(setInputConfirmacaoSenha)}
                        placeholder='Confirmar Nova Senha'
                    />
                    <div
                        className="eye-icon"
                        onClick={() => setMostrarConfirmacaoSenha(!mostrarConfirmacaoSenha)}
                    >
                        {mostrarConfirmacaoSenha ? <FaRegEyeSlash /> : <FaRegEye />}
                    </div>
                </div>
                {confirmacao && (<p id='msgConfirmacao'>{confirmacao}</p>)}
                <button
                    type='submit'
                    id='buttonSalvar'
                    disabled={!senha.trim() || !confirmacaoSenha.trim()}
                >
                    Salvar
                </button>
            </form>
        </>
    );
}

export default AlterarSenha;
