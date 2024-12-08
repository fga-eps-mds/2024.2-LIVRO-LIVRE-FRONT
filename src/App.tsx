import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecuperarSenha from './componentes/RecuperarSenha'
import AlterarSenha from './componentes/AlterarSenha'
function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<RecuperarSenha />} />
          <Route path="/AlterarSenha" element={<AlterarSenha />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}
export default App
