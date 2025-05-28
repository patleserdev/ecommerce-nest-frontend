import { getCategories, getProducts,getBrands } from "@/lib/api";
import { notFound } from "next/navigation.js";

import DashboardClientWrapper from "@/components/Admin/DashboardClientWrapper";

export default async function Dashboard() {

  const categories = await getCategories();
  if (!categories) return notFound();

  const products = await getProducts();
  if (!products) return notFound();

  const brands = await getBrands();
  if (!brands) return notFound();

  return (
   <DashboardClientWrapper categories={categories} products={products} brands={brands}/>
  );
}
