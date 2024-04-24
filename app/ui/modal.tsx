// components/Modal.tsx
"use client"

import { BackspaceIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';

// Define the props interface
interface ModalProps {
  isOpen: boolean;
  close: () => void;  // Function that returns nothing
  content: string;
}

interface ModalBoxProps {
    content: string;
  }

// Modal component defined with a function declaration
  function Modal(props: ModalProps) {
  const { isOpen, close, content } = props;
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', // Modal overlays the page content
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        padding: 20,
        background: 'white',
        borderRadius: 5,
        minWidth: '300px',
        maxWidth: '33%', // Set the maximum width to 33% of the viewport width
        width: 'auto', // This ensures that the content determines the actual width, up to the maximum
        margin: '0 auto', // This will help in centering the modal if it's narrower than the max-width
      }}>
        <p>{content}</p>
        <button onClick={close}><BackspaceIcon className="h-6 w-6 text-black-500 " aria-hidden="true"/></button>
      </div>
    </div>
  );
}


export default function ModalBox({ content }: ModalBoxProps) {
    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
  
    return (
      <div>
        <button onClick={openModal}><InformationCircleIcon className="h-6 w-6 text-black-500" aria-hidden="true"/></button>
        <Modal 
          isOpen={isModalOpen} 
          close={closeModal} 
          content={content}
        />
      </div>
    );
  }
