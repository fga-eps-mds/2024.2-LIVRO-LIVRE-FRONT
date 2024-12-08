import { HStack, Text } from "@chakra-ui/react"
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
} from "../../../components/ui/dialog"
import { Button } from "../../../components/ui/button"
import useApi from "../../../hooks/useApi"
import { useAuth } from "../../../hooks/useAuth"
import { useNavigate } from "react-router"

const DeleteProfileDialog = () => {
  const navigate = useNavigate();
  const { deleteProfile, getProfile } = useApi();
  const { token, signOut } = useAuth();
  
  const handleDelete = async () => {
    console.log('maia', 123)
    if (!token) return;
    const { data } = await getProfile(token);
    await deleteProfile(data.id);
    signOut();
    navigate('/login');
  }

  return (
    <HStack>
      <DialogRoot size='xs' placement='center'>
        <DialogTrigger asChild>
          <Button
            type="submit"
            width={'100%'}
            size={'2xl'}
            bg={'red.100'}
            fontWeight={'semibold'}
          >
            Excluir conta
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir conta</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text>
              Tem certeza que deseja excluir sua conta? Essa ação é irreversível.
            </Text>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogActionTrigger>
            <Button bg='red.100' onClick={handleDelete}>Excluir</Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </HStack>
  )
}

export default DeleteProfileDialog