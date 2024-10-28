import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // นำเข้า useNavigate และ useLocation
import { Box, Typography, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { motion } from 'framer-motion'; // นำเข้า framer-motion เพื่อเพิ่ม animation
import webbg from './image/webbg.png';

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

export default function NextFace() {
  const location = useLocation();
  const navigate = useNavigate(); // ใช้ useNavigate เพื่อจัดการการนำทาง
  const { result, imageFile } = location.state || {}; // รับ imageFile จาก state เพื่อส่งกลับหน้า next1
  const { predicted_class, confidence_score } = result || {};

  return (
    <ThemeProvider theme={defaultTheme}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}  // เพิ่ม animation คล้ายหน้าอื่นๆ
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        style={{
          position: 'fixed',  // ครอบคลุมทั้งหน้าจอ
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',  // ป้องกันการเลื่อนขึ้นลง
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: `url(${webbg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              maxWidth: '1200px',
              textAlign: 'center',
              alignItems: 'center',
              marginBottom: '40px',
              flexDirection: { xs: 'column', md: 'row' },  // ปรับเป็นแนวตั้งบนมือถือ
              padding: { xs: '20px', md: '0' },  // เพิ่ม padding สำหรับมือถือ
            }}
          >
            {/* ฝั่งซ้าย */}
            <Box
              sx={{
                flex: 1,
                paddingRight: { xs: 0, md: '20px' }, // ปรับ padding ตามขนาดหน้าจอ
                '&:hover': {
                  transform: 'scale(1.1)', // เพิ่มเอฟเฟกต์เมื่อชี้เมาส์
                  transition: 'transform 0.3s ease',
                },
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 'bold',
                  color: '#000',
                  fontSize: { xs: '2.5rem', md: '4rem' },  // ปรับขนาดตามหน้าจอ
                }}
              >
                คุณ
              </Typography>
            </Box>

            {/* กลาง */}
            <Box
              sx={{
                flex: 1,
                paddingLeft: { xs: 0, md: '20px' },
                paddingRight: { xs: 0, md: '20px' },
                '&:hover': {
                  transform: 'scale(1.1)', // เพิ่มเอฟเฟกต์เมื่อชี้เมาส์
                  transition: 'transform 0.3s ease',
                },
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 'bold',
                  color: '#000',
                  marginBottom: 5,
                  fontSize: { xs: '2.5rem', md: '4rem' },  // ปรับขนาดตามหน้าจอ
                }}
              >
                ความเหมือน
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 'bold',
                  color: '#ff4081',
                  textShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
                  fontSize: { xs: '60px', md: '120px' },  // ขนาดเพิ่มขึ้นสำหรับจอใหญ่
                  '&:hover': {
                    transform: 'scale(1.1)', // เพิ่มเอฟเฟกต์เมื่อชี้เมาส์
                    transition: 'transform 0.3s ease',
                  },
                }}
              >
                {confidence_score}%
              </Typography>
            </Box>

            {/* ฝั่งขวา */}
            <Box
              sx={{
                flex: 1,
                paddingLeft: { xs: 0, md: '20px' },
                '&:hover': {
                  transform: 'scale(1.1)', // เพิ่มเอฟเฟกต์เมื่อชี้เมาส์
                  transition: 'transform 0.3s ease',
                },
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 'bold',
                  color: '#000',
                  fontSize: { xs: '2.5rem', md: '4rem' },  // ปรับขนาดตามหน้าจอ
                }}
              >
                {predicted_class}
              </Typography>
            </Box>
          </Box>

          {/* ปุ่มย้อนกลับ */}
          <Box
            sx={{
              position: 'absolute',
              bottom: '100px', // ขยับขึ้นมาเล็กน้อย
              textAlign: 'center',
            }}
          >
            <Button
              variant="contained"
              sx={{
                borderRadius: '30px',
                padding: { xs: '15px 40px', md: '20px 60px' },  // ปรับขนาด padding สำหรับมือถือ
                backgroundColor: '#FEFFDA',
                color: '#000',
                fontWeight: 'bold',
                fontSize: { xs: '16px', md: '20px' },  // ลดขนาดตัวอักษรสำหรับมือถือ
                border: '2px solid #000',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#ffeb3b',
                  transform: 'scale(1.05)',
                },
              }}
              onClick={() => navigate('/next1', { state: { imageFile } })}  // นำทางกลับไปหน้า next1 พร้อมกับส่ง imageFile กลับ
            >
              ย้อนกลับ
            </Button>
          </Box>
        </Box>
      </motion.div>
    </ThemeProvider>
  );
}
