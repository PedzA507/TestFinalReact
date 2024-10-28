import React, { useState } from 'react';
import { Container, Box, Card, CardContent, Button, IconButton, Typography } from '@mui/material';
import { PhotoLibrary } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import webbg from './image/webbg.png';
import starImage from './image/star.png';
import { useImage } from '../ImageContext';
 
export default function Mainpage() {
  const { setImageFile, imageFile } = useImage();
  const [imagePreviewUrl, setImagePreviewUrl] = useState(imageFile ? URL.createObjectURL(imageFile) : null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
 
    // ตรวจสอบว่าประเภทของไฟล์เป็นภาพเท่านั้น
    if (file && file.type.startsWith('image/')) {
      setImageFile(file); // บันทึก imageFile ลง context
      setErrorMessage('');
 
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setErrorMessage('กรุณาอัปโหลดเฉพาะไฟล์รูปภาพ!');
    }
  };
 
  const handlePredict = () => {
    if (!imageFile) {
      setErrorMessage('กรุณาอัปโหลดรูปภาพก่อนทำการทำนาย!');
    } else {
      navigate('/next1');
    }
  };
 
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      style={{ minHeight: '100vh', overflow: 'hidden' }}
    >
      <Box
        sx={{
          minHeight: '100vh',
          backgroundImage: `url(${webbg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          position: 'fixed',
          width: '100%',
          height: '100vh',
        }}
      >
        <Container maxWidth="lg">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ flexDirection: { xs: 'column', md: 'row' }}}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              sx={{ width: { xs: '100%', md: 'auto' }}}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 'bold',
                  color: '#fff',
                  marginBottom: 3,
                  textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
                  fontSize: { xs: '1.5rem', md: '3rem' },
                }}
              >
                Select Image
              </Typography>
 
              <Card
                sx={{
                  width: { xs: '300px', md: '400px' },
                  height: { xs: '300px', md: '400px' },
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fafafa',
                  borderRadius: '20px',
                  boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)',
                  marginBottom: 3,
                  border: '2px solid #000',
                }}
              >
                <CardContent>
                  <IconButton color="primary" aria-label="upload picture" component="label">
                    <input hidden accept="image/*" type="file" onChange={handleImageChange} />
                    {imagePreviewUrl ? (
                      <img
                        src={imagePreviewUrl}
                        alt="Preview"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '20px',
                        }}
                      />
                    ) : (
                      <PhotoLibrary sx={{ fontSize: { xs: 50, md: 70 }, color: '#1976d2' }} />
                    )}
                  </IconButton>
                </CardContent>
              </Card>
 
              {errorMessage && (
                <Typography variant="body1" sx={{ marginBottom: 2, color: '#fff' }}>
                  {errorMessage}
                </Typography>
              )}
 
              <Button
                variant="contained"
                color="secondary"
                onClick={handlePredict}
                sx={{
                  borderRadius: '20px',
                  padding: { xs: '10px 20px', md: '15px 30px' },
                  backgroundColor: '#FEFFDA',
                  color: '#000',
                  border: '2px solid #000',
                  fontWeight: 'bold',
                  fontSize: { xs: '16px', md: '18px' },
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#ffcc80',
                    transform: 'scale(1.05)',
                  },
                }}
              >
                ทำนาย
              </Button>
            </Box>
 
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                width: { xs: '200px', md: 'auto' },
                height: { xs: '200px', md: 'auto' },
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                maxWidth: '600px',
                maxHeight: '600px',
              }}
            >
              <img src={starImage} alt="Star" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </Box>
          </Box>
        </Container>
      </Box>
    </motion.div>
  );
}