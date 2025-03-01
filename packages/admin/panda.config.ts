import { defineConfig } from '@pandacss/dev';
import { createPreset } from '@park-ui/panda-preset';
import accentColor from '@park-ui/panda-preset/colors/iris';
import grayColor from '@park-ui/panda-preset/colors/mauve';
export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    './app/**/*.{js,jsx,ts,tsx}',
    // "./pages/**/*.{js,jsx,ts,tsx}"
  ],
  //Presets
  presets: [
    '@pandacss/preset-base',
    createPreset({
      accentColor,
      grayColor,
      // borderRadius: 'xs',
      radius: 'xs',
    }),
  ],
  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      // recipes,
    },
  },
  // Frameworks to include
  jsxFramework: 'react',

  // The output directory for your css system
  // outdir: "app/styled-system",
  outdir: 'styled-system',
});
