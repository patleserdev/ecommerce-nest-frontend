"use client";
import { useState } from "react";
import { MdCancel } from "react-icons/md";

export default function Modal({ children,onClose }) {

    const [isModalOpen,setIsModalOpen]=useState(false)

  return (
    <div className="modal absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black border min-w-[50%] min-h-[50%] p-2">
        <div className="relative p-2 flex flex-col items-stretch justify-center gap-5"> 
        <div className="absolute right-0 top-0 m-2 cursor-pointer" onClick={onClose}>
        <MdCancel size={26}/>

        </div>
        {children}
        </div>
      
    </div>
  );
}
