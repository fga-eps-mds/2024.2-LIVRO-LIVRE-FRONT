import { BrowserRouter, Route, Routes } from "react-router"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import { AuthProvider } from "./hooks/useAuth"
import { ChakraProvider } from "@chakra-ui/react"
import { system } from "./theme"

function App() {
  return (
    <ChakraProvider value={system}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/cadastro" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App
