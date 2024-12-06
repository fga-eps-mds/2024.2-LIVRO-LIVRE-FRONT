import { useState } from 'react';
import LogoEmail from '../assets/LogoEmail.svg';
import LogoEyeClose from '../assets/LogoEyeClose.svg';
import LogoEyeOpen from '../assets/LogoEyeOpen.svg';
import LogoSenha from '../assets/LogoSenha.svg';

export function TelaLogin() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Controla se a senha está visível
    const [eyeIcon, setEyeIcon] = useState(LogoEyeOpen); // Controla o ícone do olho

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible); // Alterna a visibilidade da senha
        setEyeIcon(isPasswordVisible ? LogoEyeOpen : LogoEyeClose); // Alterna o ícone do olho
    };

    return (
        <div className='container'>
            <div className='textos'>
                <p style={{ fontWeight: 'bold', fontSize: '22px' }}>Bem-vindo ao Livro Livre</p>
                <p>Insira seus dados para fazer o login e <br />começar a utilizar o Livro Livre</p>
            </div>
            <div className='campos'>
                <div className='inputSpaces'>
                    <img src={LogoEmail} alt="Ícone de E-mail" className='icons' />
                    <input type="email" placeholder="E-mail" className="inputEmail" />
                </div>
                <div className='inputSpaces'>
                    <img src={LogoSenha} alt="Ícone de Senha" className='icons' />
                    <input
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="Senha"
                        className="inputSenha"
                    />
                    <button type="button" className="input-button" onClick={togglePasswordVisibility}>
                        <img src={eyeIcon} alt="Mostrar/Esconder senha" className="button-icon" />
                    </button>
                </div>
            </div>
            <div className='finals'>
                <p>Esqueceu sua senha? <a href="/recuperar">Recupere aqui</a></p>
                <button type="submit" className="botaoEntrar">Entrar</button>
                <div className="line"></div>
                <p>Não tem uma conta? <a href="/cadastro">Crie uma conta aqui</a></p>
            </div>
        </div>
    );
}
