"use client";
import { ReactNode,useState } from "react";
import { MdCancel } from "react-icons/md";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }:ModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="modal absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[var(--background)] text-[var(--foreground)] border min-w-[50%] min-h-[30%] p-2 pb-4 shadow-lg shadow-black z-10">
      <div className="relative p-2 flex flex-col items-stretch justify-center gap-5">
        <div
          className="absolute right-0 top-0 m-2 cursor-pointer"
          onClick={onClose}
        >
          <MdCancel size={26} />
        </div>
        {children}
      </div>
    </div>
  );
}
