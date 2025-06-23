"use client";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { FaUpload } from "react-icons/fa";
type Props = {
  onFileChange: (file: File) => void;
  onRemoveFile: () => void;
  file: File | null;
};

export default function FileUpload({
  onFileChange,
  onRemoveFile,
  file,
}: Props) {
  const [error, setError] = useState<string | null>(null);

  const maxSize = 10 * 1024 * 1024; // 10 Mo

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      
      setTimeout(() => {
        setError(null)
      }, 2000);
      if (acceptedFiles[0]) {
        if (acceptedFiles[0].size > maxSize) {
          setError("Le fichier ne doit pas dépasser 10 Mo.");
          return;
        }


        onFileChange(acceptedFiles[0]);
      }
    },
    multiple: false,
  });

  useEffect(() => {
    return () => {
      if (file) URL.revokeObjectURL(file as any);
    };
  }, [file]);

  const preview = file ? URL.createObjectURL(file) : null;


  return (
    <div className="border p-4 space-y-4">
      <div
        {...getRootProps()}
        className="flex flex-col items-center justify-center cursor-pointer text-center p-4"
      >
        <input {...getInputProps()} />
        {!file && <FaUpload size={100} />}
        {!file && (<>
          <p className="text-gray-500">Déposez un fichier ou cliquez ici</p>
          <p className="text-gray-500">(10Mo Max)</p></>
        )}
         {error && (
        <p className="text-red-600 text-center font-semibold">{error}</p>
      )}
      </div>

      {file && preview && (
        <div className="relative w-fit mx-auto">
          <Image src={preview} alt="Aperçu" width={300} height={300} />
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemoveFile();
            }}
            className="absolute top-1 right-1 bg-white rounded-full p-2 hover:bg-red-100"
          >
            <RiDeleteBin7Fill className="text-red-500" />
          </button>
        </div>
      )}
    </div>
  );
}
