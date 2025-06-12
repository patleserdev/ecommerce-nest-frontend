import {
  Category,
  CreateProduct,
  UpdateProduct,
  Brand,
} from "@/types/product.js";
import Fetch from "./fetch";
import { addUser } from "@/redux/reducers/userSlice";
import { AppDispatch } from "@/redux/store/store.js";
import { AddressRoleType, AdresseType } from "@/types/adresses";
import { clearUser } from "@/redux/reducers/userSlice";
import { useDispatch } from "react-redux";
const API_BACKEND = process.env.NEXT_PUBLIC_API_BACKEND;


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
  const data = await Fetch<{ role: string; username: string }>({
    url: `/api/login`,
    options: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    },
  });

  dispatch(addUser({ role: data.role, username: data.username }));

  return { ok: true, role: data.role };
}

export async function signupUser(
  email: string,
  username: string,
  password: string
) {
  await Fetch({
    url: `/api/signup`,
    options: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    },
  });

  return { ok: true };
}

export async function logout() {
  await Fetch({
    url: `/api/logout`,
    options: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
  });

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
  const response = await Fetch({
    url: `${API_BACKEND}/categories`,
    options: {
      headers: {
        // Authorization: `Bearer ${yourToken}`,
      },
    },
  });
  // console.log(response)
  return response;
}

export async function getCategoriesByParent(id: number): Promise<Category[]> {
  const response = await Fetch({
    url: `${API_BACKEND}/categories/parent/${id}`,
    options: {
      headers: {
        // Authorization: `Bearer ${yourToken}`,
      },
    },
  });
  return response.datas;
}

export async function getCategoryById(id: number) {
  const response = await Fetch({
    url: `${API_BACKEND}/categories/${id}`,
    options: {
      headers: {
        // Authorization: `Bearer ${yourToken}`,
      },
    },
  });
  return response.datas;
}

export async function getCategoriesByParentId(id: number) {
  const response = await Fetch({
    url: `${API_BACKEND}/categories/sub/${id}`,
    options: {
      headers: {
        // Authorization: `Bearer ${yourToken}`,
      },
    },
  });
  return response.datas;
}

export async function getCategoryBySlug(slug: string, parentSlug: string) {
  const cleanSlug = slug.toLowerCase().trim();
  const cleanParentSlug = parentSlug?.toLowerCase().trim();
  let parent = "";
  if (cleanParentSlug != "") {
    parent = `?parent=${cleanParentSlug}`;
  }
  // console.log('cleanSlug',cleanSlug)
  const response = await Fetch({
    url: `${API_BACKEND}/categories/slug/${cleanSlug}${parent}`,
    options: {
      headers: {
        // Authorization: `Bearer ${yourToken}`,
      },
    },
  });
  return response;
}

export async function addCategorie({
  formData,
}: {
  formData: { name: String; parent_id?: Number };
}) {
  const res = await Fetch({
    url: `${API_BACKEND}/categories`,
    options: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include", // très important pour accepter les cookies
    },
  });
  if (!res.ok) throw new Error("Login failed");
  const data = await res.json();
  const response = { ok: true };
  return response;
}

export async function updateCategorie({
  id,
  formData,
}: {
  id: Number;
  formData: { name: String; parent_id?: Number };
}) {
  const res = await Fetch({
    url: `${API_BACKEND}/categories/${id}`,
    options: {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include", // très important pour accepter les cookies
    },
  });
  if (!res.ok) throw new Error("Login failed");
  const data = await res.json();
  const response = { ok: true };
  return response;
}

export async function destroyCategorie(id: Number) {
  const res = await Fetch({
    url: `${API_BACKEND}/categories/${id}`,
    options: {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // très important pour accepter les cookies
    },
  });
  if (!res.ok) throw new Error("Login failed");
  // const data = await res.json();
  const response = { ok: true };
  return response;
}

/***
 *      _____  _____   ____  _____  _    _  _____ _______ _____
 *     |  __ \|  __ \ / __ \|  __ \| |  | |/ ____|__   __/ ____
 *     | |__) | |__) | |  | | |  | | |  | | |       | | | (___
 *     |  ___/|  _  /| |  | | |  | | |  | | |       | |  \___ \
 *     | |    | | \ \| |__| | |__| | |__| | |____   | |  ____) |
 *     |_|    |_|  \_\\____/|_____/ \____/ \_____|  |_| |_____/
 */

export async function getProducts(): Promise<UpdateProduct[]> {
  const response = await Fetch({
    url: `${API_BACKEND}/products`,
    options: {
      headers: {
        // Authorization: `Bearer ${yourToken}`,
      },
    },
  });
  return response;
}

export function getProductsByCategory(id: number) {
  try {
    const response = Fetch({
      url: `${API_BACKEND}/products/categories/${id}`,
      options: {
        headers: {
          // Authorization: `Bearer ${yourToken}`,
        },
      },
    });
    return response;
  } catch (error) {}
}
export function getProductBySlug(slug: string) {
  try {
    const response = Fetch({
      url: `${API_BACKEND}/products/slug/${slug}`,
      options: {
        next: { tags: ["products"] },
        headers: {
          // Authorization: `Bearer ${yourToken}`,
        },
      },
    });
    return response;
  } catch (error) {}
}

export async function addProduct({ formData }: { formData: CreateProduct }) {
  const res = await Fetch({
    url: `${API_BACKEND}/products`,
    options: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include", // très important pour accepter les cookies
    },
  });
  if (!res.ok) throw new Error("Login failed");
  const data = await res.json();
  const response = { ok: true };
  return response;
}

export async function updateProduct({
  id,
  formData,
}: {
  id: Number;
  formData: UpdateProduct;
}) {
  const res = await Fetch({
    url: `${API_BACKEND}/products/${id}`,
    options: {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include", // très important pour accepter les cookies
    },
  });
  if (!res.ok) throw new Error("Login failed");
  const data = await res.json();
  const response = { ok: true };
  return response;
}

export async function destroyProduct(id: Number) {
  const res = await Fetch({
    url: `${API_BACKEND}/products/${id}`,
    options: {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // très important pour accepter les cookies
    },
  });
  if (!res.ok) throw new Error("Login failed");
  // const data = await res.json();
  const response = { ok: true };
  return response;
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
  const response = await Fetch({
    url: `${API_BACKEND}/brands`,
    options: {
      headers: {
        // Authorization: `Bearer ${yourToken}`,
      },
    },
  });
  return response;
}

export async function addBrand({ formData }: { formData: Brand }) {
  const res = await Fetch({
    url: `${API_BACKEND}/brands`,
    options: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include", // très important pour accepter les cookies
    },
  });
  if (!res.ok) throw new Error("Login failed");
  const data = await res.json();
  const response = { ok: true };
  return response;
}

export async function updateBrand({
  id,
  formData,
}: {
  id: Number;
  formData: Brand;
}) {
  // console.log("update product", formData);
  const res = await Fetch({
    url: `${API_BACKEND}/brands/${id}`,
    options: {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include", // très important pour accepter les cookies
    },
  });
  if (!res.ok) throw new Error("Login failed");
  const data = await res.json();
  const response = { ok: true };
  return response;
}

export async function destroyBrand(id: Number) {
  const res = await Fetch({
    url: `${API_BACKEND}/brands/${id}`,
    options: {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // très important pour accepter les cookies
    },
  });
  if (!res.ok) throw new Error("Login failed");
  // const data = await res.json();
  const response = { ok: true };
  return response;
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
  const response = await Fetch({
    url: `${API_BACKEND}/adresses`,
    options: {
      headers: {
        // Authorization: `Bearer ${yourToken}`,
      },
    },
  });
  return response;
}

export async function getAdressesByUser(
  dispatch: AppDispatch
): Promise<AdresseType[]> {
  try {
    const response = await Fetch({
      url: `${API_BACKEND}/adresses/user`,
      options: {
        headers: {
          // Authorization: `Bearer ${yourToken}`,
        },
        credentials: "include", // très important pour accepter les cookies
      },
    });
    return response;
  } catch (error) {
    if ((error as any).statusCode === 401) {
      // dispatch l'action logout ici
      dispatch(clearUser());
    }
    throw new Error("Unauthorized");
  }
}

export async function addAdress({ formData }: { formData: AdresseType }) {
  const res = await Fetch({
    url: `${API_BACKEND}/adresses`,
    options: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include", // très important pour accepter les cookies
    },
  });
  if (!res) throw new Error("Ajout d'adresse échoué");

  const response = { ok: true };
  return response;
}

export async function updateAddress({
  id,
  formData,
}: {
  id: Number;
  formData: AdresseType;
}) {
  // console.log("update adress", formData);
  const res = await Fetch({
    url: `${API_BACKEND}/adresses/${id}`,
    options: {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include", // très important pour accepter les cookies
    },
  });
  if (!res) throw new Error("Mise à jour d'adresse échoué");

  const response = { ok: true };
  return response;
}

export async function destroyAdress(id: Number) {
  const res = await Fetch({
    url: `${API_BACKEND}/adresses/${id}`,
    options: {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // très important pour accepter les cookies
    },
  });
  if (!res) throw new Error("Suppression échouée");

  console.log(res);
  const response = { ok: true };
  return response;
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
  const res = await Fetch({
    url: `${API_BACKEND}/address-roles`,
    options: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include", // très important pour accepter les cookies
    },
  });
  console.log(res)
  if (!res) throw new Error("Mise à jour d'adresse échoué");

  const response = { ok: true };
  return response;
}
