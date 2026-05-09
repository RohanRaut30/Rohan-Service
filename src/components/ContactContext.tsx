"use client";

import React, { createContext, useContext, useState } from "react";
import { ContactModal } from "./ContactModal";

interface ContactContextType {
  openContactModal: () => void;
  closeContactModal: () => void;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ContactContext.Provider value={{ openContactModal: () => setIsOpen(true), closeContactModal: () => setIsOpen(false) }}>
      {children}
      <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </ContactContext.Provider>
  );
}

export function useContact() {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContact must be used within a ContactProvider");
  }
  return context;
}
