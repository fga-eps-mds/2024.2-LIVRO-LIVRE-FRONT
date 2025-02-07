import { render, screen } from "@testing-library/react";
import BorrowBookHeader from "../src/pages/BorrowBook/BorrowBookHeader";
import { ChakraProvider } from "@chakra-ui/react";
import { defaultSystem } from "@chakra-ui/react";
import React from "react";


describe("BorrowBookHeader Component", () => {
  test("deve renderizar corretamente", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <BorrowBookHeader />
      </ChakraProvider>
    );
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
  });
});
