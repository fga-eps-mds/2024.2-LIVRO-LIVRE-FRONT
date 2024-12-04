import { useState } from 'react'
import './App.css'
import './styles/telaLogin.css'
import { TelaLogin } from './components/TelaLogin.tsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TelaLogin />
    </>
  )
}

export default App
