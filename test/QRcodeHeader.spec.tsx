import React from "react";
import { render, screen } from "@testing-library/react";
import QRcodeHeader from "../src/pages/QRcode/QRcodeHeader";
import { ChakraProvider } from "@chakra-ui/react";
import { defaultSystem } from "@chakra-ui/react"

describe("QRcodeHeader Component", () => {
  test("deve renderizar corretamente", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <QRcodeHeader />
      </ChakraProvider>
    );

    
    expect(screen.getByRole("img", { name: /logo/i })).toBeInTheDocument();
  });
});
