import React, { useState, useContext, useMemo, useEffect } from "react";
import { m } from "framer-motion";

const ModalContext = React.createContext();

export const ModalProvider = ({ ...props }) => {
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const closeModal = () => {
    setOpen(false);
    setModalContent(null);
  };

  const openModal = (content) => {
    setModalContent(content);
    setOpen(true);
  };

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
      }}
    >
      <div className="relative">
        {open && (
          <>
            <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-70 z-40"></div>
            <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed top-0 left-0 w-screen h-screen z-50 flex items-center justify-center">
              {modalContent}
            </m.div>
          </>
        )}
        {props.children}
      </div>
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);

export default ModalContext;
