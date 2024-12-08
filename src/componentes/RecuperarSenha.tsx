import { useState } from 'react';
import './RecuperarSenha.css'
import { useNavigate } from "react-router-dom";
function RecuperarSenha() {
    const navigate = useNavigate();
    const [inputEmail, setInputValue] = useState('');
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
      };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        alert('Código enviado com sucesso.');
        navigate("/AlterarSenha");
    };
    return (
        <>
            <div className='infos'>
                <h3 id='title'>Recuperação de senha</h3>
                <p id='subtitle'>Para recuperar o acesso a sua conta, vamos enviar um código para seu e-mail.</p>
            </div>
            <form id='formEmail' onSubmit={handleSubmit} >
                <input className='inputEmail'
                    id="email"
                    value={inputEmail}
                    onChange={handleInputChange}
                    type="email"
                    placeholder="E-mail"
                    required
                />
                <button
                    id='button'
                    disabled={!inputEmail.trim()}
                    type='submit'
                >
                    Solicitar nova senha
                </button>
            </form>
       </>

    );
}
export default RecuperarSenha;


