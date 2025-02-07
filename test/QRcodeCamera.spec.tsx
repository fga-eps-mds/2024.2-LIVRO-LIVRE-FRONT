import React from "react";
import { render, screen } from "@testing-library/react";
import QRcodeCamera from "../src/pages/QRcode/QRcodeCamera";
import userEvent from "@testing-library/user-event";
import { ChakraProvider } from "@chakra-ui/react";
import { defaultSystem } from "@chakra-ui/react"

jest.mock("../src/components/ui/QRcodeReader", () => {
  return jest.fn(({ onResult }) => (
    <button onClick={() => onResult("Teste QR Code")}>Simular QR Code</button>
  ));
});

describe("QRcodeCamera Component", () => {
  test("deve renderizar corretamente", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <QRcodeCamera />
      </ChakraProvider>
    );

    expect(screen.getByText("Leitor de QR Code")).toBeInTheDocument();
  });

  test("deve exibir o resultado ao ler um QR Code", async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <QRcodeCamera />
      </ChakraProvider>
    );

    const button = screen.getByText("Simular QR Code");
    await userEvent.click(button);
    expect(screen.getByText("Resultado: Teste QR Code")).toBeInTheDocument();
  });
});
