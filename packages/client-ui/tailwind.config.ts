import type { Config } from 'tailwindcss';
export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        roboto: ['Roboto', 'serif'],
      },
      colors: {
        primary: '#3b28cc',
        light: '#F0F0F0',
        dark: '#1E1E1E',
        lime: '#8CBD62',
        warning: '#FFC107',
        danger: '#DE2E2E',
      },
    },
  },
};
