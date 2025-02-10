import React from "react";
import { render, screen } from "@testing-library/react";
import QRcode from "../src/pages/QRcode";
import { ChakraProvider } from "@chakra-ui/react";
import { defaultSystem } from "@chakra-ui/react"

jest.mock("../src/components/NavBar", () => ({ NavBar: () => <div>NavBar</div> }));
jest.mock("../src/pages/QRcode/QRcodeHeader", () => () => <div>QRcodeHeader</div>);
jest.mock("../src/pages/QRcode/QRcodeCamera", () => () => <div>QRcodeCamera</div>);
jest.mock("../src/pages/QRcode/backbutton", () => () => <div>BackButton</div>);

describe("QRcode Component", () => {
  test("deve renderizar corretamente todos os componentes filhos", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <QRcode />
      </ChakraProvider>
    );

    expect(screen.getByText("QRcodeHeader")).toBeInTheDocument();
    expect(screen.getByText("BackButton")).toBeInTheDocument();
    expect(screen.getByText("QRcodeCamera")).toBeInTheDocument();
    expect(screen.getByText("NavBar")).toBeInTheDocument();
  });
});
