"use client";
import { useRouter } from "next/navigation.js";
import CustomedButton from "./CustomedButton";
export default function NavigateTo({
  label,
  route,
  type,
  className
}: {
  label: string;
  route: string;
  type:string;
  className?:string
}) {
  const router = useRouter();

  return (
    <CustomedButton onClick={() => router.push(route)} type={type} className={className}>{label} </CustomedButton>
  );
}
