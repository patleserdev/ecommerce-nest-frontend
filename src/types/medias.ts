
export type MediaType = {
  id?: string;
  fileName?:string;
  url?:string;
  title: string;
  description: string;
  altText?:string
  file?: File | null;
  height?:number,
  width?:number
};

export type MediaLinkType = {
  id?: string;
  mediaId:string; // id du media
  linkedType?:string; // type de l'entité 'brand','categorie','product' 
  linkedId: string; // id de l'entité
  role: string; // ex: 'thumbnail', 'banner', 'gallery'
  position?:number
};
