import { Category,CategoryWithChildren } from "@/types/product";
   
  export function transformCategories(categories: Category[]): CategoryWithChildren[] {
    const categoryMap: Record<number, CategoryWithChildren> = {};
    const result: CategoryWithChildren[] = [];
  
    // Initialise les catégories avec un tableau vide pour les enfants
    categories.forEach((cat) => {
     

      categoryMap[cat.id] = { ...cat, children: [] };
    });
  
    // Organise les catégories
    categories.forEach((cat) => {
      if (cat.parent_id === 0) {
        result.push(categoryMap[cat.id]);
      } else {
        const parent = categoryMap[cat.parent_id];
        if (parent) {
          parent.children?.push(categoryMap[cat.id]);
        }
      }
    });
  
    // Trie les enfants alphabétiquement pour chaque parent
    result.forEach((parent) => {
      if (parent.children) {
        parent.children.sort((a, b) => a.name.localeCompare(b.name));
      }
    });
  
    // Trie les parents aussi
    result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }
  
  export function toFirstLetterUpper(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }