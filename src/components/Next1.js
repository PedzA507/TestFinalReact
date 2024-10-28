import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import webbg from './image/webbg.png';
import { motion } from 'framer-motion';
import { useImage } from '../ImageContext';

const defaultTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#ff4081' },
  },
});

export default function Next1() {
  const { imageFile } = useImage();  // ดึง imageFile จาก context
  const navigate = useNavigate();

  const handleFacePrediction = async () => {
    if (!imageFile) {
      console.error('No image file');
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    const baseUrl = process.env.REACT_APP_PREDICT_BASE_URL;

    if (!baseUrl) {
      console.error('Base URL not defined');
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/ai/predict`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Face prediction result:', data); // ตรวจสอบผลลัพธ์จาก API

      if (response.ok) {
        navigate('/nextface', { state: { result: data } });
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAgePrediction = async () => {
    if (!imageFile) {
      console.error('No image file');
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    const baseUrl = process.env.REACT_APP_PREDICT_BASE_URL;

    if (!baseUrl) {
      console.error('Base URL not defined');
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/ai/predict/age`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Age prediction result:', data);  // ตรวจสอบผลลัพธ์จาก API

      if (response.ok) {
        navigate('/nextage', { state: { result: data } });  // ส่งผลลัพธ์ไปหน้า nextage
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <Box
          sx={{
            minHeight: '100vh',
            backgroundImage: `url(${webbg})`,
            backgroundSize: 'cover',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '0 16px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              maxWidth: '900px',
              marginBottom: 4,
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
            }}
          >
            <Button
              variant="contained"
              sx={{
                borderRadius: '30px',
                padding: '20px',
                width: { xs: '100%', md: '400px' },
                height: '70px',
                fontSize: '16px',
                fontWeight: 'bold',
                backgroundColor: '#FEFFDA',
                color: 'black',
                border: '2px solid #000',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: '#ffeb3b',
                  transform: 'scale(1.05)',
                },
                marginBottom: { xs: '20px', md: '0' },
              }}
              onClick={handleFacePrediction}
            >
              หน้าของคุณเหมือนดาราคนไหน
            </Button>

            <Button
              variant="contained"
              sx={{
                borderRadius: '30px',
                padding: '20px',
                width: { xs: '100%', md: '400px' },
                height: '70px',
                fontSize: '16px',
                fontWeight: 'bold',
                backgroundColor: '#FEFFDA',
                color: 'black',
                border: '2px solid #000',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: '#ffeb3b',
                  transform: 'scale(1.05)',
                },
              }}
              onClick={handleAgePrediction}
            >
              คุณอายุเท่าไหร่
            </Button>
          </Box>

          <Button
            variant="contained"
            sx={{
              borderRadius: '30px',
              padding: '20px',
              width: { xs: '100%', md: '400px' },
              height: '70px',
              fontSize: '16px',
              fontWeight: 'bold',
              backgroundColor: '#FEFFDA',
              color: 'black',
              border: '2px solid #000',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              position: 'relative',
              bottom: { xs: '0', md: '-150px' },
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: '#ffeb3b',
                transform: 'scale(1.05)',
              },
              marginTop: { xs: '20px', md: '0' },
            }}
            onClick={() => navigate('/mainpage')}
          >
            ย้อนกลับ
          </Button>
        </Box>
      </motion.div>
    </ThemeProvider>
  );
}
