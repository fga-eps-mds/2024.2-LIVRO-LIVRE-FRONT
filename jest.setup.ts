import "@testing-library/jest-dom";


if (
  typeof globalThis.TextEncoder === "undefined" ||
  typeof globalThis.TextDecoder === "undefined"
) {
  const utils = require("util");
  globalThis.TextEncoder = utils.TextEncoder;
  globalThis.TextDecoder = utils.TextDecoder;
  globalThis.Uint8Array = Uint8Array;

}

global.structuredClone = (val: string) => {
  return val === null || typeof val !== 'object' ? val : JSON.parse(JSON.stringify(val));
};

