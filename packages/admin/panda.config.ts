import { defineConfig } from '@pandacss/dev';
import { createPreset } from '@park-ui/panda-preset';
import accentColor from '@park-ui/panda-preset/colors/iris';
import grayColor from '@park-ui/panda-preset/colors/mauve';

export default defineConfig({
  // Whether to use css reset
  preflight: true,
  // Preset to use
  presets: [
    '@pandacss/preset-base',
    createPreset({
      accentColor,
      grayColor,
      // borderRadius: 'xs',
      radius: 'xs',
    }),
  ],
  // Where to look for your css declarations
  // include: ["./app/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  include: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {},
  },
  jsxFramework: 'react',
  // The output directory for your css system
  outdir: 'styled-system',
});
