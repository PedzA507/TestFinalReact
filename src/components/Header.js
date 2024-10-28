import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from './image/logoweb.jpg';  // นำเข้ารูปภาพโลโก้

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignInClick = () => {
    navigate('/signinadmin');
  };

  const handleLogoutClick = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_BASE_URL + '/api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
  
      const result = await response.json();
      if (result.status) {
        // Remove token from local storage and navigate to the main page
        localStorage.removeItem('token');
        navigate('/mainpage', { replace: true });
  
        // Block the back button to prevent returning to the previous page
        window.history.pushState(null, '', window.location.href);
        window.onpopstate = function () {
          window.history.go(1);
        };
  
        // Refresh the page to clear any stored data
        window.location.reload();
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  

  const handleHomeClick = () => {
    navigate('/');
  };

  const isDashboard = location.pathname === '/dashboard';
  const isSignInPage = location.pathname === '/signinadmin';  // ตรวจสอบว่าอยู่ในหน้า signinadmin หรือไม่

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'rgba(255, 182, 193, 0.8)',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Toolbar>
          {/* โลโก้เว็บไซต์ */}
          <Box
            component="img"
            id="Logohome"
            src={logo}  // ใช้โลโก้ที่นำเข้า
            alt="Logo"
            onClick={handleHomeClick}
            sx={{
              height: 80,  // ขนาดโลโก้เล็กลง
              width: 80,   // ขนาดโลโก้เล็กลง
              cursor: 'pointer',
              borderRadius: '50%', // ให้เป็นรูปวงกลม
              objectFit: 'cover',  // ให้ภาพพอดีกับกรอบ
              border: '2px solid #fff', // กรอบสีขาวรอบๆ โลโก้
              marginLeft: '20px',  // ขยับโลโก้มาทางขวา
            }}
          />
          <Box sx={{ flexGrow: 1 }} />
          {!isSignInPage && ( // ซ่อนปุ่มล็อกอินถ้าอยู่ในหน้า signinadmin
            isDashboard ? (
              <Button
                variant="contained"
                color="secondary"
                id="Logout"
                sx={{
                  fontWeight: 'bold',
                  fontSize: '16px',
                  backgroundColor: '#FEFFDA',
                  borderRadius: '10px',
                  border: '2px solid #000',  // กรอบสีดำหนาขึ้น
                  color: '#000',
                  padding: '10px 20px',
                  transition: 'transform 0.2s ease-in-out',  // เพิ่มเอฟเฟกต์การขยายเมื่อ hover
                  '&:hover': {
                    backgroundColor: '#ffcc80',
                    transform: 'scale(1.05)',  // ขยายปุ่มเมื่อ hover
                  },
                }}
                onClick={handleLogoutClick}
                aria-label="ออกจากระบบ"
              >
                ออกจากระบบ
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                id="Login"
                sx={{
                  fontWeight: 'bold',
                  fontSize: '16px',
                  backgroundColor: '#FEFFDA',
                  borderRadius: '10px',
                  border: '2px solid #000',  // กรอบสีดำหนาขึ้น
                  color: '#000',
                  padding: '10px 20px',  // ขยายปุ่มให้ดูน่ากดมากขึ้น
                  transition: 'transform 0.2s ease-in-out',  // เพิ่มเอฟเฟกต์การขยายเมื่อ hover
                  '&:hover': {
                    backgroundColor: '#ffcc80',
                    transform: 'scale(1.05)',  // ขยายปุ่มเมื่อ hover
                  },
                }}
                onClick={handleSignInClick}
                aria-label="เข้าสู่ระบบ"
              >
                เข้าสู่ระบบ
              </Button>
            )
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
