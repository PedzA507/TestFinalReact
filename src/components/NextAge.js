import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { motion } from 'framer-motion';
import webbg from './image/webbg.png';
import { useImage } from '../ImageContext';

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
});

export default function ImageComparisonPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { imageFile } = useImage();
  const [age, setAge] = useState(null);

  useEffect(() => {
    if (location.state && location.state.result && location.state.result.predicted_age) {
      setAge(Math.floor(location.state.result.predicted_age));
    }
  }, [location.state]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        style={{ height: '100vh' }}
      >
        <Box
          sx={{
            flexGrow: 1,
            backgroundImage: `url(${webbg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '0 16px',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
              <Box
                sx={{
                  marginTop: '100px',
                  width: '400px',
                  height: '400px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: 3,
                }}
              >
                {imageFile ? (
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Uploaded person"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain', // ใช้ contain เพื่อให้รูปแสดงเต็มอัตราส่วน
                    }}
                  />
                ) : (
                  <Typography variant="h6" sx={{ textAlign: 'center', marginTop: '20px' }}>
                    No Image Uploaded
                  </Typography>
                )}
              </Box>
            </Box>
          </motion.div>

          {/* แสดงอายุที่ทำนายได้ */}
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            อายุ: <span style={{ backgroundColor: '#ffefc0', padding: '0 16px', borderRadius: '8px' }}>{age !== null ? age : 'N/A'}</span>
          </Typography>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <Box sx={{ mt: 2 }}>
              <Button 
                variant="contained"
                sx={{ 
                  borderRadius: '10px',
                  border: '1px solid #000',
                  padding: '10px',
                  width: '100%',
                  maxWidth: '200px',
                  height: '50px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  backgroundColor: '#FEFFDA',
                  color: 'black',
                  '&:hover': {
                    backgroundColor: '#ffd996',
                  },
                }}
                onClick={() => navigate('/next1')}
              >
                ย้อนกลับ
              </Button>
            </Box>
          </motion.div>
        </Box>
      </motion.div>
    </ThemeProvider>
  );
}
