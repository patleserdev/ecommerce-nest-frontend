import Nav from "@/components/Nav";
import { notFound } from "next/navigation";
import { getCategories } from "@/lib/api";
import { Category, Child } from "@/types/product.js";
import Link from "next/link.js";
export default async function Categories() {
  const categories = await getCategories();
  if (!categories) return notFound();

  const mainCategories = categories.filter(
    (cat: Category) => cat.parent_id === 0
  );
  const childCategories = categories.filter(
    (cat: Category) => cat.parent_id !== 0
  );

  const groupedChildren: Record<number, Child[]> = categories.reduce<
    Record<number, Child[]>
  >((acc, cat) => {
    if (!acc[cat.parent_id]) acc[cat.parent_id] = [];
    acc[cat.parent_id].push({ id: cat.id, name: cat.name }); // Ensure it matches `Child` type
    return acc;
  }, {});

  return (
    <div className="p-2">
      <h1>E-commerce - Categories</h1>
      <Nav />

      <div>
        <ul className="p-5">
          {mainCategories.map((parent) => (
            <li key={parent.id} className="pb-5 uppercase">
             
              <Link href={`categories/${parent.id}`}> {parent.name}</Link>
              {groupedChildren[parent.id] && (
                <ul>
                  {groupedChildren[parent.id].map((child) => (
                    <li className="capitalize px-2" key={child.id}>
                      <Link href={`categories/${child.id}`}> {child.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
