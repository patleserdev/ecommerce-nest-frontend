"use server"
import { revalidateTag } from 'next/cache';

export async function revalidateProducts() {
  try {
    revalidateTag('products');
    return { success: true, message: 'Revalidation réussie' };
  } catch (error) {
    return { success: false, message: 'Erreur de revalidation', error };
  }
  }
  