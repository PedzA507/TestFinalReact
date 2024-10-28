import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const defaultTheme = createTheme();

export default function SigninAdmin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ดึง baseURL จาก .env โดยใช้ในช่วงพัฒนาและ production
  const baseURL = process.env.REACT_APP_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseURL}/api/login`, {
        username,
        password
      });

      const result = response.data;
      alert(result.message);

      if (result.token) {
        // เก็บ token ลง localStorage
        localStorage.setItem('token', result.token);
        navigate('/dashboard');  // นำทางไปหน้า dashboard ถ้าล็อกอินสำเร็จ
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 403) {
          alert("บัญชีของคุณถูกล็อกเป็นเวลา 5 นาที");
        } else if (err.response.status === 401) {
          alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
        } else {
          alert("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
        }
      } else {
        alert("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        style={{ minHeight: '100vh' }}
      >
        <Box
          sx={{
            minHeight: '100vh',
            backgroundColor: '#faf5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                mt: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                padding: 4,
                borderRadius: '16px',
              }}
            >
              <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: '#333' }}>
                Who Are You ?
              </Typography>

              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  sx={{
                    backgroundColor: '#ffffff',
                    mb: 2,
                    borderRadius: '8px',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#000000',
                      },
                      '&:hover fieldset': {
                        borderColor: '#FF69B4',
                      },
                    },
                  }}
                  InputLabelProps={{
                    style: { color: '#333' },
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    backgroundColor: '#ffffff',
                    mb: 2,
                    borderRadius: '8px',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#000000',
                      },
                      '&:hover fieldset': {
                        borderColor: '#FF69B4',
                      },
                    },
                  }}
                  InputLabelProps={{
                    style: { color: '#333' },
                  }}
                />
                <Button
                  type="submit"
                  id="Submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: '#FFE5EC',
                    color: '#FB6F92',
                    border: '2px solid #F694C1',
                    padding: '12px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    '&:hover': {
                      backgroundColor: '#ffccd5',
                    },
                  }}
                >
                  เข้าสู่ระบบ
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </motion.div>
    </ThemeProvider>
  );
}
