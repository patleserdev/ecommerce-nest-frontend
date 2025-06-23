import { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import FileUpload from "@/components/Medias/Fileupload";
import { MediaType } from "@/types/medias";

type FormValues = {
  title: string;
  description: string;
  file: File | null;
};

type Props = {
  defaultValues?: Omit<FormValues, "file">;
  onSubmit: (data: FormValues) => void;
  toEdit: MediaType | null;
};

function fileReducer(
  state: File | null,
  action: { type: "add"; file: File } | { type: "clear" },
) {
  switch (action.type) {
    case "add":
      return action.file;
    case "clear":
      return null;
    default:
      return state;
  }
}

export default function MediaForm({ toEdit, defaultValues, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<FormValues, "file">>({
    defaultValues: {
      title: defaultValues?.title ?? "",
      description: defaultValues?.description ?? "",
    },
  });

  const [file, dispatchFile] = useReducer(fileReducer, null);
  const [showFileError, setShowFileError] = useState(false);

  // 🔁 Préremplir le fichier si toEdit est fourni
  useEffect(() => {
    if (toEdit?.url) {
      fetch(toEdit.url)
        .then((res) => res.blob())
        .then((blob) => {
          const extension = toEdit.url?.split(".").pop()?.split("?")[0] || "jpg";
          const filename = toEdit.altText || `image.${extension}`;
          const newFile = new File([blob], filename, { type: blob.type });
          dispatchFile({ type: "add", file: newFile });
        })
        .catch((err) => console.error("Erreur fetch image:", err));
    }

    // Préremplir les champs texte aussi
    if (toEdit) {
      reset({
        title: toEdit.title || "",
        description: toEdit.description || "",
      });
    }
  }, [toEdit, reset]);

  const handleFinalSubmit = (data: Omit<FormValues, "file">) => {
    if (!file) {
      setShowFileError(true);
      return;
    }
    setShowFileError(false);
    onSubmit({ ...data, file });
  };

  return (
    <form onSubmit={handleSubmit(handleFinalSubmit)} className="space-y-4 w-full">
      <div>
        <label>Titre</label>
        <input
          type="text"
          {...register("title", { required: true })}
          className="w-full border p-2"
        />
        {errors.title && <p className="text-red-500">Titre requis</p>}
      </div>

      <div>
        <label>Description</label>
        <textarea
          {...register("description", { required: true })}
          className="w-full border p-2"
        />
        {errors.description && <p className="text-red-500">Description requise</p>}
      </div>

      <div>
        <FileUpload
          onFileChange={(file) => {
            dispatchFile({ type: "add", file });
            setShowFileError(false);
          }}
          onRemoveFile={() => {
            dispatchFile({ type: "clear" });
            setShowFileError(true);
          }}
          file={file}
        />
        {showFileError && !file && <p className="text-red-500">Fichier requis</p>}
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Valider
      </button>
    </form>
  );
}
