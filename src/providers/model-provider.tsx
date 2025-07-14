"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/generated/prisma";

interface ModalProviderProps {
  children: React.ReactNode;
}

export type ModalData = {
  user?: User;
};

type ModalContextType = {
  data: ModalData;
  isOpen: boolean;
  setOpen: (
    modal: React.ReactNode,
    fetchData?: () => Promise<Partial<ModalData>>
  ) => Promise<void>;
  setClose: () => void;
};

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<ModalData>({});
  const [showingModal, setShowingModal] = useState<React.ReactNode>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const setOpen = async (
    modal: React.ReactNode,
    fetchData?: () => Promise<Partial<ModalData>>
  ) => {
    // Only open if modal is not null or undefined
    if (modal != null) {
      if (fetchData) {
        const fetchedData = await fetchData();
        setData((prevData) => ({ ...prevData, ...fetchedData }));
      }
      setShowingModal(modal);
      setIsOpen(true);
    }
  };

  const setClose = () => {
    setIsOpen(false);
    setData({});
    setShowingModal(null);
  };

  // Prevent rendering on server or before mount to avoid hydration issues
  if (!isMounted) return null;

  return (
    <ModalContext.Provider value={{ data, isOpen, setOpen, setClose }}>
      {children}
      {isOpen && showingModal}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export default ModalProvider;
