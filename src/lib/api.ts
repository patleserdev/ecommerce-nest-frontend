import {
  Category,
  CreateProduct,
  UpdateProduct,
  Brand,
} from "@/types/product.js";
import Fetch from "./fetch";
import { addUser } from "@/redux/reducers/userSlice";
import { AppDispatch } from "@/redux/store/store.js";
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
  const res = await fetch(`/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include", // très important pour accepter les cookies
  });
  if (!res.ok) throw new Error("Login failed");

  const data = await res.json();
  // console.log("userdata", data);
  if (data) {
    dispatch(
      addUser({
        role: data.role,
        username: data.username,
      })
    );
  }

  const response = { ok: true,role:data.role };
  return response;
}

export async function signupUser(
  email: string,
  username:string,
  password: string,

) {
  const res = await fetch(`/api/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email,username, password }),
    credentials: "include", // très important pour accepter les cookies
  });
  if (!res.ok) throw new Error("Inscription échouée");

  const response = { ok: true };
  return response;
}

export async function logout() {
  const res = await fetch(`/api/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Logout failed");
  const data = await res.json();
  const response = { ok: true };
  return response;
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
  return response;
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
  return response;
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
  return response;
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
  const res = await fetch(`${API_BACKEND}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    credentials: "include", // très important pour accepter les cookies
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
  const res = await fetch(`${API_BACKEND}/categories/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    credentials: "include", // très important pour accepter les cookies
  });
  if (!res.ok) throw new Error("Login failed");
  const data = await res.json();
  const response = { ok: true };
  return response;
}

export async function destroyCategorie(id: Number) {
  const res = await fetch(`${API_BACKEND}/categories/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // très important pour accepter les cookies
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
        next: { tags: ['products'] },
        headers: {
          // Authorization: `Bearer ${yourToken}`,
        },
      },
    });
    return response;
  } catch (error) {}
}

export async function addProduct({ formData }: { formData: CreateProduct }) {
  const res = await fetch(`${API_BACKEND}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    credentials: "include", // très important pour accepter les cookies
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
  const res = await fetch(`${API_BACKEND}/products/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    credentials: "include", // très important pour accepter les cookies
  });
  if (!res.ok) throw new Error("Login failed");
  const data = await res.json();
  const response = { ok: true };
  return response;
}

export async function destroyProduct(id: Number) {
  const res = await fetch(`${API_BACKEND}/products/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // très important pour accepter les cookies
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
  const res = await fetch(`${API_BACKEND}/brands`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    credentials: "include", // très important pour accepter les cookies
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
  console.log("update product", formData);
  const res = await fetch(`${API_BACKEND}/brands/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    credentials: "include", // très important pour accepter les cookies
  });
  if (!res.ok) throw new Error("Login failed");
  const data = await res.json();
  const response = { ok: true };
  return response;
}

export async function destroyBrand(id: Number) {
  const res = await fetch(`${API_BACKEND}/brands/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // très important pour accepter les cookies
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
