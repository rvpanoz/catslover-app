import React from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";

interface ModalProps {
  title: string;
  content: React.ReactNode | null;
  isOpen: boolean;
  onClose: () => void;
  onAfterClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  title,
  content,
  isOpen,
  onClose,
  onAfterClose,
}) => {
  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    onClose();
    if (onAfterClose) {
      onAfterClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-100 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.1 }}
        transition={{ duration: 1, type: "spring" }}
        className="bg-white p-6 rounded-2xl shadow-xl w-96 relative"
      >
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 cursor-pointer"
          onClick={handleClose}
        >
          <X size={24} />
        </button>
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="mt-2 text-gray-600">{content}</div>
      </motion.div>
    </div>
  );
};

export default Modal;
