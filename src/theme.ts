'use client';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface PaletteColor {
    lighter?: string;
  }

  interface SimplePaletteColorOptions {
    lighter?: string;
  }
}

const theme = createTheme({
  colorSchemes: {
    light: true,
    dark: false,
  },
  defaultColorScheme: 'light',
  palette: {
    mode: 'light',
    // Warna Utama (Brand)
    primary: {
      lighter: '#e3f2fd',
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff',
    },
    // Warna Sekunder (Aksen)
    secondary: {
      lighter: '#f3e5f5',
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
      contrastText: '#ffffff',
    },
    // Warna Status (Penting untuk Tabel & Alert)
    success: {
      lighter: '#5ee769',
      main: '#2e7d32', // Hijau (Active / Done)
      light: '#4caf50',
      dark: '#1b5e20',
      contrastText: '#ffffff',
    },
    error: {
      lighter: '#ffebee',
      main: '#d32f2f', // Merah (Disabled / Expired)
      light: '#ef5350',
      dark: '#c62828',
      contrastText: '#ffffff',
    },
    warning: {
      lighter: '#fff3e0',
      main: '#ed6c02', // Orange (Temporary / Pending)
      light: '#ff9800',
      dark: '#e65100',
      contrastText: '#ffffff',
    },
    info: {
      lighter: '#e1f5fe',
      main: '#0288d1', // Biru Muda (Info)
      light: '#03a9f4',
      dark: '#01579b',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f4f6f8', 
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
});

export default theme;
