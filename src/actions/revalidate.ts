"use server";
import { revalidateTag } from "next/cache";

export async function revalidateProducts() {
  try {
    revalidateTag("products");
    setTimeout(() => {
      return { success: true, message: "Revalidation réussie" };
    }, 200);
  } catch (error) {
    return { success: false, message: "Erreur de revalidation", error };
  }
}
