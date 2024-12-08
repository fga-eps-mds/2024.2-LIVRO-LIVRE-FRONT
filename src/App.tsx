import { BrowserRouter, Route, Routes } from "react-router"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import { AuthProvider } from "./hooks/useAuth"
import { ChakraProvider } from "@chakra-ui/react"
import { system } from "./theme"
import Profile from "./pages/Profile"
import ProfileEdit from "./pages/ProfileEdit"
import Warnings from "./pages/Warnings"
import Loans from "./pages/Loans"
import { Toaster } from "./components/ui/toaster"
import PrivateRoute from './PrivateRoute';
import SignIn from "./pages/SignIn"

function App() {
  return (
    <ChakraProvider value={system}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/cadastro" element={<SignUp />} />
            <Route path="/inicio" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/perfil" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/perfil/editar" element={<PrivateRoute><ProfileEdit /></PrivateRoute>} />
            <Route path="/avisos" element={<PrivateRoute><Warnings /></PrivateRoute>} />
            <Route path="/emprestimos" element={<PrivateRoute><Loans /></PrivateRoute>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <Toaster />
    </ChakraProvider>
  )
}

export default App
