import { BrowserRouter, Route, Routes } from "react-router"
import SignUp from "./pages/SignUp"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="cadastro" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
