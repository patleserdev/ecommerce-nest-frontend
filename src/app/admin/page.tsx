import { getCategories } from "@/lib/api";
import { Category, Child } from "@/types/product";
import { notFound } from "next/navigation.js";
import Link from "next/link.js";
import { MdAddCircle } from "react-icons/md";
import Modal from "@/components/Modal";
import DashboardClientWrapper from "@/components/Admin/DashboardClientWrapper";

export default async function Dashboard() {

  const categories = await getCategories();
  if (!categories) return notFound();


  return (
   <DashboardClientWrapper categories={categories}/>
  );
}
