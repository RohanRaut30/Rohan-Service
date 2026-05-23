"use client";

import React, { createContext, useContext, useState } from "react";
import { ContactModal } from "./ContactModal";

interface ContactContextType {
  openContactModal: (initialProjectText?: string) => void;
  closeContactModal: () => void;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialProjectText, setInitialProjectText] = useState("");

  const openContact = (text?: string) => {
    setInitialProjectText(text || "");
    setIsOpen(true);
  };

  return (
    <ContactContext.Provider value={{ openContactModal: openContact, closeContactModal: () => setIsOpen(false) }}>
      {children}
      <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} initialProjectText={initialProjectText} />
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
