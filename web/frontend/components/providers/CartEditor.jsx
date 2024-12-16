import React, { createContext, useState } from 'react';


export const CartEditorContext = createContext();

export const CustomizeProvider = ({ children }) => {

  const [activeCustomize, setActiveCustomize] = useState(false);

  return (
    <CartEditorContext.Provider value={{ activeCustomize, setActiveCustomize }}>
      {children}
    </CartEditorContext.Provider>
  );
};
