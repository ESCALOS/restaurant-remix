import React from "react";
import { useModalStore } from "~/store/modalStore";

type Props = {
  id: string;
  title: string;
  children: React.ReactNode;
};

const Modal: React.FC<Props> = ({ id, title, children }) => {
  const { modals, closeModal } = useModalStore();
  const isOpen = modals[id] || false;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <button
          onClick={() => closeModal(id)}
          className="absolute top-4 right-4 text-primary-700 hover:text-primary-900"
        >
          &times;
        </button>
        <h3 className="text-lg font-semibold text-primary-800 mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );
};

export default Modal;
