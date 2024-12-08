import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        blue: {
          100: { value: '#0a3063' },
        },
        green: {
          100: { value: '#037030' },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
