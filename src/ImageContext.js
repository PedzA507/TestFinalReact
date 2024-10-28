import React, { createContext, useContext, useState } from 'react';

// สร้าง context สำหรับจัดการภาพ
const ImageContext = createContext();

export const useImage = () => {
  return useContext(ImageContext);  // ส่งออก hook ใช้ context
};

export const ImageProvider = ({ children }) => {
  const [imageFile, setImageFile] = useState(null); // state สำหรับจัดการภาพ

  return (
    <ImageContext.Provider value={{ imageFile, setImageFile }}>
      {children}
    </ImageContext.Provider>
  );
};
