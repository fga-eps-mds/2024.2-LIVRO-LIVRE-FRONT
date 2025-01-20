import { Separator, Text, Grid, Image, Heading, Container, Stack} from '@chakra-ui/react';
import { Rating } from "../../../components/ui/rating"

function SearchBookGrid() {
    return (
        <Stack gap={3}>
            <Separator />
            {/* <Text textStyle={'3xl'} fontWeight={'semibold'} color={'blue.100'}>Aqui fica o grid de livros encontrados</Text> */}
            <Grid templateColumns={"repeat(2, minmax(10px, 1fr))"} templateRows={'1fr'}
             gap={'20px'} alignItems={'center'}>
            <Container  width={'150px'} bg={'gray.100'} p={'10px'} shadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px;"}
            borderRadius={'4px'} justifySelf={'center'} height={'260px'}> 
                <Image
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    alt="Capa do Livro"
                />
                <Heading size={'lg'} mt={'2'} >Título do Livro</Heading>
                <Text textStyle={'sm'}>Autor do Livro</Text>
                <Rating  readOnly allowHalf defaultValue={3} size={'xs'} colorPalette={'yellow'} />
            </Container>    
            <Container  width={'150px'} bg={'gray.100'} p={'10px'} shadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px;"}
             borderRadius={'4px'} justifySelf={'center'} height={'260px'}> 
                <Image
                    src="https://plus.unsplash.com/premium_photo-1682125773446-259ce64f9dd7?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Capa do Livro"
                />
                <Heading size={'lg'} mt={'2'}>Título do Livro</Heading>
                <Text textStyle={'sm'}>Autor do Livro</Text>
                <Rating  readOnly allowHalf defaultValue={4.5} size={'xs'} colorPalette={'yellow'} />
            </Container>
            </Grid>
        </Stack>
    );
}

export default SearchBookGrid

//~ Exibir os resultados em formato de grid no frontend.
// ~ Garantir que cada item do grid inclua:
// ~ Capa do livro.
//~  Título do livro.
//~  Autor do livro.
//~ Nota média do livro (com visualização de estrelas ou nota numérica).
