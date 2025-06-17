
import { notFound } from "next/navigation";
import { getCategories } from "@/lib/api";
import { Category, Child } from "@/types/product.js";
import Link from "next/link.js";
import Image from "next/image.js";
import logo from "@/components/Logo";
import DisplayIcon from "@/components/DisplayIcon";

export const dynamic = "force-static"; // <-- force la génération SSG au moment du build
export const revalidate = 60;


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
    acc[cat.parent_id].push({ id: cat.id, name: cat.name,slug: cat.slug,  parent_id: cat.parent_id, 
    }); 
    return acc;
  }, {});

  return (
    <div className="p-2">
      <h1>E-commerce - Categories</h1>
      <div>
        <div className="p-5 flex flex-row flex-wrap gap-5">
          {mainCategories
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((parent) => (
              <div key={parent.id} className="p-2 uppercase border w-80">
                <Link
                  className="text-2xl font-bold"
                  href={`categories/${parent.slug}`}
                >
                  <div className="flex flex-col items-center justify-center">
                    <DisplayIcon icon={`/icons/${parent.slug}.png`}/>
             
                    {parent.name}
                  </div>
                </Link>

                {groupedChildren[parent.id] && (
                  <div className="flex flex-row flex-wrap items-center justify-around">
                    {groupedChildren[parent.id]
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((child) => {
                        const picture = logo(child.name);

                        return (
                          <Link
                            key={child.id}
                            href={`categories/${parent.name}/${child.name}`}
                          >
                            <div className="p-2 flex flex-col justify-center items-center opacity-[0.5] hover:opacity-[1] transition-all cursor-pointer">
                              {child.name}

                              <Image
                                src={picture}
                                alt="logo"
                                width={100}
                                height={100}
                                style={{ filter: "invert(1)" }}
                              />
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
