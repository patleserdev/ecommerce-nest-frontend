import { Category } from "@/types/product.js";
import Fetch from "./fetch";

const API_BACKEND = "http://localhost:3000";

  export async function getCategories(): Promise<Category[]> {
    const response=await Fetch({
       url: `${API_BACKEND}/categories`,
       options: {
         headers: {
           // Authorization: `Bearer ${yourToken}`,
         },
       },
     });
     return response
   }

   export async function getCategoriesByParent(id:number): Promise<Category[]> {
    const response=await Fetch({
       url: `${API_BACKEND}/categories/parent/${id}`,
       options: {
         headers: {
           // Authorization: `Bearer ${yourToken}`,
         },
       },
     });
     return response
   }

   

export async function getCategoryById(id: number) {
 const response=await Fetch({
    url: `${API_BACKEND}/categories/${id}`,
    options: {
      headers: {
        // Authorization: `Bearer ${yourToken}`,
      },
    },
  });
  return response
}

export function getProductsByCategory(id:number)
{
    try {
        const response= Fetch({
            url: `${API_BACKEND}/products/categories/${id}`,
            options: {
              headers: {
                // Authorization: `Bearer ${yourToken}`,
              },
            },
          });
          return response 
    } catch (error) {
        
    }

}
