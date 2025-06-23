"use client";
import Image from "next/image.js";
import { MdAddCircle, MdCancel, MdEdit } from "react-icons/md";
import Modal from "../Modal";
import { useState,useEffect } from "react";
import MediaForm from "./MediaForm";
import { MediaType } from "@/types/medias";
import { addMedia, destroyMedia, getMedias, updateMedia } from "@/lib/api";
import { useRouter } from "next/navigation.js";
import { toFirstLetterUpper } from "../../lib/utils";
export default function MediaAdminWrapper() {
  /***
   *          _           _
   *         | |         | |
   *       __| | ___  ___| | __ _ _ __ ___
   *      / _` |/ _ \/ __| |/ _` | '__/ _ \
   *     | (_| |  __/ (__| | (_| | | |  __/
   *      \__,_|\___|\___|_|\__,_|_|  \___|
   *
   *
   */
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMedia, setIsEditMedia] = useState<MediaType | null>(null);
  const [reload, setReload] = useState(false);
  const [medias, setMedias] = useState<MediaType[]>([]);
  /***
   *       __                  _   _
   *      / _|                | | (_)
   *     | |_ _   _ _ __   ___| |_ _  ___  _ __  ___
   *     |  _| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
   *     | | | |_| | | | | (__| |_| | (_) | | | \__ \
   *     |_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|___/
   *
   *
   */
  const handleToOpenAddMedia = () => {
    setIsModalOpen(true);
  };

  const handleToAddMedia = async (formData: MediaType) => {
    const result = await addMedia({ formData });
    if (result) {
      console.log("media ajouté");
      setIsModalOpen(false);
      setReload(!reload);
    }
  };
  const handleToOpenToEditMedia = (media: MediaType) => {
    setIsEditMedia(media);
    setIsModalOpen(true);
    // call api
    // refresh
  };

  const handleToEditMedia = async (id: string, media: MediaType) => {
    const result = await updateMedia({ id, formData: media });
    if (result) {
      console.log("media ajouté");
      setIsModalOpen(false);
      setIsEditMedia(null);
      setReload(!reload);
    }
  };

  const handleToDeleteMedia = async (id?: string) => {
    if (!id) return;
    const verif = confirm("Etes-vous sûr de vouloir supprimer ce média ?");
    if (verif) {
      const result = await destroyMedia(id);
      if (result) {
        console.log("media supprimé");
        setReload(!reload);
      }
    }
  };
  /***
   *                           __  __          _
   *                          / _|/ _|        | |
   *      _   _ ___  ___  ___| |_| |_ ___  ___| |_ ___
   *     | | | / __|/ _ \/ _ \  _|  _/ _ \/ __| __/ __|
   *     | |_| \__ \  __/  __/ | | ||  __/ (__| |_\__ \
   *      \__,_|___/\___|\___|_| |_| \___|\___|\__|___/
   *
   *
   */
  useEffect(() => {

      (async () => {
        const medias = await getMedias();
        if (medias) {
          setMedias(medias);
        }
      })();
    
  }, [reload]);

  /***
   *          _ _           _
   *         | (_)         | |
   *       __| |_ ___ _ __ | | __ _ _   _
   *      / _` | / __| '_ \| |/ _` | | | |
   *     | (_| | \__ \ |_) | | (_| | |_| |
   *      \__,_|_|___/ .__/|_|\__,_|\__, |
   *                 | |             __/ |
   *                 |_|            |___/
   */

  const SkeletonCard = ({ media }: { media: MediaType }) => (
    <div className="skeleton-card  bg-gray-200 rounded-lg shadow-sm shadow-black overflow-hidden">
      <div className="flex flex-col md:flex-row h-full">
        <div className="skeleton-title flex flex-col justify-between md:w-1/2 p-2">
          <div>
            <h3>{toFirstLetterUpper(media.title)}</h3>
          </div>

          {media?.id && (
            <div className="actions flex gap-2">
              <MdEdit
                size={24}
                onClick={() => handleToOpenToEditMedia(media)}
                className="cursor-pointer opacity-[0.5] hover:opacity-[1]"
              />
              <MdCancel
                size={24}
                onClick={() => handleToDeleteMedia(media.id)}
                className="cursor-pointer opacity-[0.5] hover:opacity-[1]"
              />
            </div>
          )}
        </div>
        <div className="skeleton-body flex items-start justify-center md:w-1/2 relative aspect-video h-50">
          {media.url && media.altText && (
            <Image
              src={media.url}
              alt={media.altText}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="flex flex-row items-center justify-start gap-5  p-2 my-2">
        <div
          className="flex gap-2 border p-2 cursor-pointer"
          onClick={() => handleToOpenAddMedia()}
        >
          <span>Ajouter une image</span>
          <MdAddCircle size={30} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-2">
        {medias.map((media, index) => (
          <SkeletonCard key={media.id} media={media} />
        ))}
      </div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="p-2 flex items-center justify-center">
            {/* relation Marque , Produit, Categorie
            pouvoir ajouter des relations  */}

            <MediaForm
              toEdit={isEditMedia}
              onSubmit={(e) =>
                isEditMedia && isEditMedia.id
                  ? handleToEditMedia(isEditMedia.id, e)
                  : handleToAddMedia(e)
              }
            />
          </div>
        </Modal>
      )}
    </>
  );
}
