import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Mainpage from './components/Mainpage';
import Next1 from './components/Next1';
import NextFace from './components/NextFace';
import NextAge from './components/NextAge';
import Dashboard from './components/Dashboard';
import SigninAdmin from './components/SigninAdmin';
import { ImageProvider } from './ImageContext';  // นำเข้า ImageProvider
import { ThemeProvider, createTheme } from '@mui/material/styles';

const defaultTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff4081',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <ImageProvider> {/* ครอบด้วย ImageProvider เพื่อให้ใช้ Context */}
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/mainpage" />} />
            <Route exact path='/mainpage' element={<Mainpage />} />
            <Route exact path='/next1' element={<Next1 />} />
            <Route exact path='/nextface' element={<NextFace />} />
            <Route exact path='/nextage' element={<NextAge />} />
            <Route exact path='/signinadmin' element={<SigninAdmin />} />
            <Route exact path='/dashboard' element={<Dashboard />} />
          </Routes>
        </Router>
      </ImageProvider>
    </ThemeProvider>
  );
}
