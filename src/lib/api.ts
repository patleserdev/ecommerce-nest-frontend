import {
  Category,
  CreateProduct,
  UpdateProduct,
  Brand,
  Product,
} from "@/types/product.js";
import Fetch from "./fetch";
import { addUser } from "@/redux/reducers/userSlice";
import { AppDispatch } from "@/redux/store/store.js";
import { AddressRoleType, AdresseType } from "@/types/adresses";
import { clearUser } from "@/redux/reducers/userSlice";
import { useDispatch } from "react-redux";
import { MediaType } from "@/types/medias";
const API_BACKEND = process.env.NEXT_PUBLIC_API_BACKEND;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
/***
 *      _    _  _____ ______ _____   _____
 *     | |  | |/ ____|  ____|  __ \ / ____|
 *     | |  | | (___ | |__  | |__) | (___
 *     | |  | |\___ \|  __| |  _  / \___ \
 *     | |__| |____) | |____| | \ \ ____) |
 *      \____/|_____/|______|_|  \_\_____/
 */

export async function loginUser(
  email: string,
  password: string,
  dispatch: AppDispatch
) {
  const { response, data } = await Fetch<{ role: string; username: string }>({
    url: `/api/login`,
    options: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    },
  });
  if (!response.ok) throw new Error("Connexion échouée");

  if (data) {
    dispatch(addUser({ role: data.role, username: data.username }));
    return { ok: true, role: data.role };
  } else {
    return { ok: false };
  }
}

export async function signupUser(
  email: string,
  username: string,
  password: string
) {
  const { response, data } = await Fetch({
    url: `/api/signup`,
    options: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    },
  });

  if (!response.ok) throw new Error("Connexion échouée");

  return { ok: true, data };
}

export async function logout() {
  const { response, data } = await Fetch({
    url: `/api/logout`,
    options: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
  });
  if (!response.ok) throw new Error("Déconnexion échouée");

  return { ok: true };
}

/***
 *       _____       _______ ______ _____  ____  _____  _____ ______  _____
 *      / ____|   /\|__   __|  ____/ ____|/ __ \|  __ \|_   _|  ____|/ ____|
 *     | |       /  \  | |  | |__ | |  __| |  | | |__) | | | | |__  | (___
 *     | |      / /\ \ | |  |  __|| | |_ | |  | |  _  /  | | |  __|  \___ \
 *     | |____ / ____ \| |  | |___| |__| | |__| | | \ \ _| |_| |____ ____) |
 *      \_____/_/    \_\_|  |______\_____|\____/|_|  \_\_____|______|_____/
 */
export async function getCategories(): Promise<Category[]> {
  const { response, data } = await Fetch({
    url: `${API_BACKEND}/categories`,
    options: {
      headers: {
        // Authorization: `Bearer ${yourToken}`,
      },
    },
  });
  if (!response.ok) throw new Error(`Récupération des catégories ${SITE_URL}`);
  // console.log(response)
  return data;
}

export async function getCategoriesByParent(id: number): Promise<Category[]> {
  const { response, data } = await Fetch({
    url: `${SITE_URL}/api/proxy/categories/parent/${id}`,
    options: {
      headers: {
        // Authorization: `Bearer ${yourToken}`,
      },
    },
  });
  if (!response.ok) throw new Error("Récupération des catégories par parent");
  return data;
}

export async function getCategoryById(id: number) {
  const { response, data } = await Fetch({
    url: `${SITE_URL}/api/proxy/categories/${id}`,
    options: {
      headers: {
        // Authorization: `Bearer ${yourToken}`,
      },
    },
  });
  if (!response.ok) throw new Error("Récupération de catégorie par id échouée");
  return data;
}

export async function getCategoriesByParentId(id: number) {
  const { response, data } = await Fetch({
    url: `${SITE_URL}/api/proxy/categories/sub/${id}`,
    options: {
      headers: {
        // Authorization: `Bearer ${yourToken}`,
      },
    },
  });
  if (!response.ok)
    throw new Error("Récupération de catégorie par parent id échouée");

  return data;
}

export async function getCategoryBySlug(slug: string, parentSlug: string) {
  const cleanSlug = slug.toLowerCase().trim();
  const cleanParentSlug = parentSlug?.toLowerCase().trim();
  let parent = "";
  if (cleanParentSlug != "") {
    parent = `?parent=${cleanParentSlug}`;
  }
  // console.log('cleanSlug',cleanSlug)
  const { response, data } = await Fetch({
    url: `${SITE_URL}/api/proxy/categories/slug/${cleanSlug}${parent}`,
    options: {
      headers: {
        // Authorization: `Bearer ${yourToken}`,
      },
    },
  });
  if (!response) throw new Error("Récupération de catégorie par slug échouée");

  return data;
}

export async function addCategorie({
  formData,
}: {
  formData: { name: String; parent_id?: Number };
}) {
  const { response, data } = await Fetch({
    url: `${SITE_URL}/api/proxy/categories`,
    options: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",

      // très important pour accepter les cookies
    },
  });
  if (!response.ok) throw new Error("Ajout de catégorie échoué");

  return { ok: true, data };
}

export async function updateCategorie({
  id,
  formData,
}: {
  id: Number;
  formData: { name: String; parent_id?: Number };
}) {
  const { response, data } = await Fetch({
    url: `${SITE_URL}/api/proxy/categories/${id}`,
    options: {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",

      // très important pour accepter les cookies
    },
  });
  if (!response.ok) throw new Error("Modification de catégorie échoué");

  return { ok: true, data };
}

export async function destroyCategorie(id: Number) {
  const { response, data } = await Fetch({
    url: `${SITE_URL}/api/proxy/categories/${id}`,
    options: {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",

      // très important pour accepter les cookies
    },
  });

  if (!response.ok) throw new Error("Suppression de catégorie échoué");
  // const data = await res.json();

  return { ok: true };
}

/***
 *      _____  _____   ____  _____  _    _  _____ _______ _____
 *     |  __ \|  __ \ / __ \|  __ \| |  | |/ ____|__   __/ ____
 *     | |__) | |__) | |  | | |  | | |  | | |       | | | (___
 *     |  ___/|  _  /| |  | | |  | | |  | | |       | |  \___ \
 *     | |    | | \ \| |__| | |__| | |__| | |____   | |  ____) |
 *     |_|    |_|  \_\\____/|_____/ \____/ \_____|  |_| |_____/
 */

export async function getProducts(): Promise<Product[]> {
  const { response, data } = await Fetch({
    url: `${API_BACKEND}/products`,
    options: {
      headers: {
        // Authorization: `Bearer ${yourToken}`,
      },
    },
  });
  if (!response.ok) throw new Error("Récupération des produits échouée");

  return data;
}

export async function getProductsByCategory(
  id: number
): Promise<{ data: Product[] | null; error: boolean }> {
  const { response, data } = await Fetch({
    url: `${SITE_URL}/api/proxy/products/categories/${id}`,
    options: {
      headers: {
        // Authorization: `Bearer ${yourToken}`,
      },
    },
  });
  if (!response.ok) {
    return { data: null, error: true };
  }

  return { data, error: false };
}
export async function getProductBySlug(slug: string) {
  const { response, data } = await Fetch({
    url: `${SITE_URL}/api/proxy/products/slug/${slug}`,
    options: {
      next: { tags: ["products"] },
      headers: {
        // Authorization: `Bearer ${yourToken}`,
      },
    },
  });
  if (!response.ok)
    throw new Error("Récupération des produits par slug échouée");

  return data;
}

export async function addProduct({ formData }: { formData: CreateProduct }) {
  const { response, data } = await Fetch({
    url: `${SITE_URL}/api/proxy/products`,
    options: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",

      // très important pour accepter les cookies
    },
  });
  if (!response.ok) throw new Error("Ajout d'un produit échoué");

  return { ok: true, data };
}

export async function updateProduct({
  id,
  formData,
}: {
  id: Number;
  formData: UpdateProduct;
}) {
  const { response, data } = await Fetch({
    url: `${SITE_URL}/api/proxy/products/${id}`,
    options: {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",

      // très important pour accepter les cookies
    },
  });
  if (!response.ok) throw new Error("Modification d'un produit échoué");

  return { ok: true, data };
}

export async function destroyProduct(id: Number) {
  const { response, data } = await Fetch({
    url: `${SITE_URL}/api/proxy/products/${id}`,
    options: {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",

      // très important pour accepter les cookies
    },
  });
  if (!response.ok) throw new Error("Destruction d'un produit échoué");

  return { ok: true, data };
}

/***
 *      ____  _____            _   _ _____   _____
 *     |  _ \|  __ \     /\   | \ | |  __ \ / ____|
 *     | |_) | |__) |   /  \  |  \| | |  | | (___
 *     |  _ <|  _  /   / /\ \ | . ` | |  | |\___ \
 *     | |_) | | \ \  / ____ \| |\  | |__| |____) |
 *     |____/|_|  \_\/_/    \_\_| \_|_____/|_____/
 */

export async function getBrands(): Promise<Brand[]> {
  const { response, data } = await Fetch({
    url: `${SITE_URL}/api/proxy/brands`,
    options: {
      headers: {
        // Authorization: `Bearer ${yourToken}`,
      },
      credentials: "include",

      // très important pour accepter les cookies
    },
  });
  if (!response.ok) throw new Error("Récupération des marques échouée");

  return data;
}

export async function addBrand({ formData }: { formData: Brand }) {
  const { response, data } = await Fetch({
    url: `${SITE_URL}/api/proxy/brands`,
    options: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",

      // très important pour accepter les cookies
    },
  });

  // Vérifie si la réponse HTTP est OK
  if (!response.ok) {
    let errorMessage = "Ajout d'une marque échoué";
    if (data?.message) {
      errorMessage = data.message;
    }
    throw new Error(errorMessage);
  }
  return { ok: true, data };
}

export async function updateBrand({
  id,
  formData,
}: {
  id: Number;
  formData: Brand;
}) {
  // console.log("update product", formData);
  const { response, data } = await Fetch({
    url: `${SITE_URL}/api/proxy/brands/${id}`,
    options: {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",

      // très important pour accepter les cookies
    },
  });
  if (!response.ok) throw new Error("Modification d'une marque échouée");

  return { ok: true, data };
}

export async function destroyBrand(id: Number) {
  const { response, data } = await Fetch({
    url: `${SITE_URL}/api/proxy/brands/${id}`,
    options: {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",

      // très important pour accepter les cookies
    },
  });
  if (!response.ok) throw new Error("Destruction d'une marque échouée");

  return { ok: true, data };
}

/***
 *       ____  _____  _____  ______ _____   _____
 *      / __ \|  __ \|  __ \|  ____|  __ \ / ____|
 *     | |  | | |__) | |  | | |__  | |__) | (___
 *     | |  | |  _  /| |  | |  __| |  _  / \___ \
 *     | |__| | | \ \| |__| | |____| | \ \ ____) |
 *      \____/|_|  \_\_____/|______|_|  \_\_____/
 */

/***
 *               _____  _____  ______  _____ _____ ______  _____
 *         /\   |  __ \|  __ \|  ____|/ ____/ ____|  ____|/ ____|
 *        /  \  | |  | | |__) | |__  | (___| (___ | |__  | (___
 *       / /\ \ | |  | |  _  /|  __|  \___ \\___ \|  __|  \___ \
 *      / ____ \| |__| | | \ \| |____ ____) |___) | |____ ____) |
 *     /_/    \_\_____/|_|  \_\______|_____/_____/|______|_____/
 *
 *
 */

export async function getAdresses(): Promise<AdresseType[]> {
  const { response, data } = await Fetch({
    url: `${SITE_URL}/api/proxy/adresses`,
    options: {
      credentials: "include",
    },
  });
  if (!response) throw new Error("Récupération des adresses échouée");

  return data;
}

export async function getAdressesByUser(): Promise<AdresseType[]> {
  const { response, data } = await Fetch({
    url: `${SITE_URL}/api/proxy/adresses/user`,
    options: {
      credentials: "include",
    },
  });
  if (!response)
    throw new Error("Récupération des adresses par utilisateur échouée");
  return data;
}

export async function addAdress({ formData }: { formData: AdresseType }) {
  const { response, data } = await Fetch({
    url: `${SITE_URL}/api/proxy/adresses`,
    options: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",

      // très important pour accepter les cookies
    },
  });
  if (!response.ok) throw new Error("Ajout d'une adresse échoué");

  return { ok: true, data };
}

export async function updateAddress({
  id,
  formData,
}: {
  id: Number;
  formData: AdresseType;
}) {
  // console.log("update adress", formData);
  const { response, data } = await Fetch({
    url: `${SITE_URL}/api/proxy/adresses/${id}`,
    options: {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",

      // très important pour accepter les cookies
    },
  });
  if (!response.ok) throw new Error("Mise à jour d'adresse échoué");

  return { ok: true, data };
}

export async function destroyAdress(id: Number) {
  const { response, data } = await Fetch({
    url: `${SITE_URL}/api/proxy/adresses/${id}`,
    options: {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",

      // très important pour accepter les cookies
    },
  });
  if (!response.ok) throw new Error("Suppression échouée");

  return { ok: true, data };
}

/***
 *               _____  _____  ______  _____ _____ ______  _____       _____   ____  _      ______  _____
 *         /\   |  __ \|  __ \|  ____|/ ____/ ____|  ____|/ ____|     |  __ \ / __ \| |    |  ____|/ ____|
 *        /  \  | |  | | |__) | |__  | (___| (___ | |__  | (___ ______| |__) | |  | | |    | |__  | (___
 *       / /\ \ | |  | |  _  /|  __|  \___ \\___ \|  __|  \___ \______|  _  /| |  | | |    |  __|  \___ \
 *      / ____ \| |__| | | \ \| |____ ____) |___) | |____ ____) |     | | \ \| |__| | |____| |____ ____) |
 *     /_/    \_\_____/|_|  \_\______|_____/_____/|______|_____/      |_|  \_\\____/|______|______|_____/
 *
 *
 */

// pour la gestion des rôles
// je vais avoir trois rôles possibles pour l'adresse
// - un rôle lié uniquement à l'userId : adresse globale de facturation ou de livraison
// - dans la panier , si aucune adresse n'est liée au cart, je prends celle liée au userId, quand le panier est validé, je crée le role de cette adresse avec userId et cartId
// - dans la commande, je crée également le role de l'adresse lié au userId et orderId

// Dans la gestion de mes adresses
// - si pas d'adresse de facturation/livraison lié à un user_id  -> je crée un role
// - si je change l'adresse de livraison

export async function addRole({ formData }: { formData: AddressRoleType }) {
  // console.log("update adress", formData);
  const { response, data } = await Fetch({
    url: `${SITE_URL}/api/proxy/address-roles`,
    options: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",

      // très important pour accepter les cookies
    },
  });

  if (!response.ok) throw new Error("Mise à jour d'un rôle d'adresse échoué");

  return { ok: true };
}

/***
 *      __  __ ______ _____ _____           _____
 *     |  \/  |  ____|  __ \_   _|   /\    / ____|
 *     | \  / | |__  | |  | || |    /  \  | (___
 *     | |\/| |  __| | |  | || |   / /\ \  \___ \
 *     | |  | | |____| |__| || |_ / ____ \ ____) |
 *     |_|  |_|______|_____/_____/_/    \_\_____/
 */
export async function getMedias(): Promise<MediaType[]> {
  const { response, data } = await Fetch({
    url: `${SITE_URL}/api/proxy/medias`,
    options: {
      credentials: "include",
    },
  });
  console.log('response',response)
  if (!response.ok) throw new Error(`Récupération des médias ${SITE_URL}`);
  // console.log(response)
  return data;
}


export async function addMedia({ formData }: { formData: MediaType }) {
  // console.log("update adress", formData);
  const dataToSend = new FormData();
  dataToSend.append("title", formData.title);
  dataToSend.append("description", formData.description);
  if (formData.file) {
    dataToSend.append("file", formData.file); // le fichier
  }

  const { response, data } = await Fetch({
    url: `${SITE_URL}/api/proxy/medias`,
    options: {
      method: "POST",
      body: dataToSend,
      credentials: "include",

      // très important pour accepter les cookies
    },
  });
  console.log(response);

  if (!response.ok) throw new Error("Ajout d'un média échoué");

  return { ok: true };
}

export async function updateMedia({
  id,
  formData,
}: {
  id: string;
  formData: MediaType;
}) {
  const dataToSend = new FormData();
  dataToSend.append("title", formData.title);
  dataToSend.append("description", formData.description);
  if (formData.file) {
    dataToSend.append("file", formData.file); // le fichier
  }
  const { response, data } = await Fetch({
    url: `${SITE_URL}/api/proxy/medias/${id}`,
    options: {
      method: "PATCH",
      body: dataToSend,
      credentials: "include",

      // très important pour accepter les cookies
    },
  });
  if (!response.ok) throw new Error("Modification de media échoué");

  return { ok: true, data };
}

export async function destroyMedia(id: string) {
  const { response, data } = await Fetch({
    url: `${SITE_URL}/api/proxy/medias/${id}`,
    options: {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",

      // très important pour accepter les cookies
    },
  });
  if (!response.ok) throw new Error("Suppression échouée");

  return { ok: true, data };
}
