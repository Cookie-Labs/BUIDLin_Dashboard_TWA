import type { Config } from 'tailwindcss';
const defaultTheme = require('tailwindcss/defaultTheme');
// ref: https://tailwindcss.com/docs/installation

const config: Config = {
  darkMode: 'class',
  mode: 'jit',
  corePlugins: {
    preflight: false,
  },
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  important: 'body', // "#__next",
  theme: {
    screens: {
      sm: '576px', // 해당 사이즈 외에서 작동
      'sm-max': { max: '576px' }, // 해당 사이즈 내에서 작동
      md: '768px',
      'md-max': { max: '768px' },
      lg: '992px',
      'lg-max': { max: '992px' },
      xl: '1200px',
      'xl-max': { max: '1200px' },
      '2xl': '1320px',
      '2xl-max': { max: '1320px' },
      '3xl': '1600px',
      '3xl-max': { max: '1600px' },
      '4xl': '1850px',
      '4xl-max': { max: '1850px' },
    },
    fontSize: {
      // size와 color와 align은 text
      xs: '0.5rem', // 8px
      sm: '0.75rem', // 12px
      base: '0.875rem', // 14px
      md: '1rem', // 16px
      lg: '1.25rem', // 20px
      xl: '1.5rem', // 24px
      xxl: '1.75rem', // 28px
      xxxl: '2rem', // 32px
      subTitle: '2.5rem', // 40px
      title: '3.25rem', // 52px
      bigTitle: '5rem', // 80px
    },
    fontWeight: {
      // weight와 family는 font
      thin: '100',
      extraLight: '200',
      light: '300',
      regular: '400',
      medium: '500',
      semiBold: '600',
      bold: '700',
      extraBold: '800',
      black: '900',
    },
    boxShadow: {
      bigCard: '4px 4px 10px 0px rgba(0,0,0,0.25)',
      smallCard: '4px 4px 20px 0px rgba(0,0,0,0.12)',
      formContainer: '4px 4px 12px 0px rgba(0,0,0,0.04)',
      dropdownMenu: '0 4px 10px 2px rgba(0,0,0,0.3)',
    },
    colors: {
      transparent: 'transparent',
      primary: '#171E26',
      secondary: '#1F2630',
      black: '#000000',
      white: '#ffffff',
      red: '#FF0000',
      gray01: '#FBFBFB',
      gray02: '#F7F7F7',
      gray03: '#F5F4F3',
      gray04: '#EFEFEF',
      gray05: '#ECECEC',
      gray06: '#DFDFDF',
      gray07: '#C1C1C1',
      gray08: '#A5A5A5',
      gray09: '#8B8B8B',
      gray10: '#6F6F6F',
      gray11: '#555555',
      gray12: '#3D3D3D',
      gray13: '#333333',
      gray14: '#242424',
      gray15: '#171717',
      blue01: '#D2E7F8',
      blue02: '#B5D8F4',
      blue03: '#98C9EF',
      blue04: '#81BFEF',
      blue05: '#6AB6F0',
      blue06: '#469FE3',
      blue07: '#2087D6',
      blue08: '#0073CB',
      blue09: '#0166B3',
      blue10: '#01599D',
      blue11: '#014D88',
      blue12: '#001B30',
      attendanceNotyet: '#A5A5A5',
      attendanceAbsent: '#FF0000',
      attendanceAttend: '#11D611',
    },
    spacing: {
      px: '1px',
      0: '0',
      0.5: '0.125rem',
      1: '0.25rem',
      1.5: '0.375rem',
      2: '0.5rem',
      2.5: '0.625rem',
      3: '0.75rem',
      3.5: '0.875rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
      11: '2.75rem',
      12: '3rem',
      14: '3.5rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      28: '7rem',
      32: '8rem',
      36: '9rem',
      40: '10rem',
      44: '11rem',
      48: '12rem',
      52: '13rem',
      56: '14rem',
      60: '15rem',
      64: '16rem',
      72: '18rem',
      80: '20rem',
      96: '24rem',
      topbarH: '3.75rem',
      footerH: '16.5rem',
      bottomMenuH: '8rem',
      sidebarW: '20rem',
      contentHWeb: 'calc(100vh - 20.25rem)',
      contentHMobile: 'calc(100vh - 11.75rem)',
    },
    opacity: {
      '0': '0',
      '20': '0.2',
      '40': '0.4',
      '60': '0.6',
      '80': '0.8',
      '100': '1',
    },
    extend: {
      // 덮어쓰기 위해 사용
      fontFamily: {
        sans: [...defaultTheme.fontFamily.sans], // 문자의 끝 부분에 장식이 없는 선
        serif: [...defaultTheme.fontFamily.serif], // 문자의 끝 부분에 장식되어 있는 부가적인 짧은 선
        mono: ['var(--roboto)', ...defaultTheme.fontFamily.mono], // 글자의 폭이 같은 글꼴
      },
      aspectRatio: {
        '4/3': '4 / 3',
      },
      borderRadius: {
        none: '0',
        sm: '.125rem',
        DEFAULT: '.25rem',
        lg: '.5rem',
        full: '9999px',
        circle: '50%',
      },
    },
  },
  plugins: [],
};

export default config;
