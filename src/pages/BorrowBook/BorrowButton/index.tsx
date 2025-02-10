import { HStack } from "@chakra-ui/react";
import { toaster } from "../../../components/ui/toaster";
import {
  DialogContent,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
  DialogBody,
  DialogActionTrigger,
  DialogCloseTrigger,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router";


interface Book {
  id: number;
  title: string;
  author: string;
  rating: number;
  description: string;
  coverImage: string;
  status: string;
}




const BorrowBookButton = ({ book }: { book: Book }) => {
  const navigate = useNavigate();

  const handleBorrow = async () => {
    try {
      const token = localStorage.getItem("@livrolivre:token");
      if (!token) throw new Error("Usuário não autenticado");
  
      const userId = token; 
  
      const response = await fetch(`http://localhost:3001/books/${book.id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "NotAvailable",
          userId, 
        }),
      });
  
      if (!response.ok) {
        throw new Error("Erro ao atualizar status do livro");
      }
  
      toaster.create({
        title: "Empréstimo Realizado",
        type: "success",
      });
  
      navigate("/");
    } catch (error) {
      console.error(error);
      toaster.create({
        title: "Erro ao realizar empréstimo",
        type: "error",
      });
    }
  };
  
  
  return (
    <HStack flexDirection="column" alignItems="center">
      <DialogRoot size="xs" placement="center">
        <DialogTrigger asChild>
          <Button
            type="button"
            width="100%"
            size="lg"
            bg={book.status !== "Available" ? "#FF8800" : "#FF8800"}
            color={book.status !== "Available" ? "white" : "White"} 
            fontWeight="semibold" 
            disabled={book.status !== "Available"}
          >
            {book.status !== "Available" ? "Livro indisponível" : "Pegar Emprestado"}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <DialogBody>
            <p>Deseja realizar esse empréstimo?</p>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button bg="red" size="sm">
                Cancelar
              </Button>
            </DialogActionTrigger>
            <Button bg="green" size="sm" onClick={handleBorrow}>
              Confirmar
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </HStack>
  );
};

export default BorrowBookButton;
