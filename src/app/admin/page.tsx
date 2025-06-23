export const dynamic = "force-dynamic";
import { getCategories, getProducts, getBrands } from "@/lib/api";
import { notFound } from "next/navigation.js";
import DashboardAdminWrapper from "@/components/Admin/DashboardAdminWrapper";
import CustomedLink from "@/components/CustomedLink";

export default async function Admin() {
  const products = await getProducts();
  if (!products) return notFound();

  const categories = await getCategories();
  if (!categories) return notFound();

  const brands = await getBrands();
  if (!brands) return notFound();

  return (
    <>
      <div className="mx-2 min-h-10 flex flex-row flex-wrap justify-start items-center">
        <div>
        <CustomedLink
          url="/admin/medias"
          title="Accéder à la médiathèque"
        ></CustomedLink>
        </div>

      </div>

      <DashboardAdminWrapper
        categories={categories}
        products={products}
        brands={brands}
      />
    </>
  );
}
