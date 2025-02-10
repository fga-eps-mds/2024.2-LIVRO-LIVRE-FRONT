import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import BorrowBook from "../src/pages/BorrowBook";
import { ChakraProvider } from "@chakra-ui/react";
import axios from "axios";
import { defaultSystem } from "@chakra-ui/react";


jest.mock("../src/components/NavBar", () => () => <div>NavBar</div>);
jest.mock("../src/pages/BorrowBook/BorrowBookHeader", () => () => <div>BorrowBookHeader</div>);
jest.mock("../src/pages/BorrowBook/BorrowBookLivro", () => () => <div>BorrowBookLivro</div>);
jest.mock("../src/pages/BorrowBook/BorrowButton", () => () => <div>BorrowButton</div>);


jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("BorrowBook Component", () => {
  test("deve renderizar corretamente todos os componentes filhos após a requisição", async () => {
    
    mockedAxios.get.mockResolvedValue({
      data: { id: "1", title: "Livro Teste" },
    });

    render(
      <ChakraProvider value={defaultSystem}>
        <BorrowBook />
      </ChakraProvider>
    );

    // Espera o componente carregar os dados
    await waitFor(() => expect(screen.getByText("BorrowBookHeader")).toBeInTheDocument());
    expect(screen.getByText("BorrowButton")).toBeInTheDocument();
    expect(screen.getByText("BorrowBookLivro")).toBeInTheDocument();
    expect(screen.getByText("NavBar")).toBeInTheDocument();
  });
});
