export function TelaLogin() {
    return (
        <div>
            <div>
                <h3>Bem vindo ao Livro Livre</h3>
                <p>Insira seus dados para fazer o login e começar a utilizar o Livro Livre</p>
            </div>
            <div>
                <div>
                    <input type="E-mail" placeholder="Email" className="inputEmail" />
                </div>
                <div>
                    <input type="Senha" placeholder="Senha" className="inputSenha" />
                </div>
            </div>
            <p>Esqueceu sua senha? <a href="/recuperar">Recupere aqui</a></p>
            <button type="submit" className="button">Entrar</button>
            <br/>
            <p>Não tem uma conta? <a href="/cadastro">Crie uma conta aqui</a></p>
        </div>
    );
}
