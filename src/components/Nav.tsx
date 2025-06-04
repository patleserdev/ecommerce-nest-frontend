"use client";
import Link from "next/link.js";
import Image from "next/image.js";
import { useEffect, useState } from "react";
import { getCategories } from "@/lib/api";
import { Category } from "@/types/product.js";
import { transformCategories } from "@/lib/utils";
import { MdLogin } from "react-icons/md";
import ThemeToggle from "./ThemeToggler";
import CartIcon from "./cart/CartIcon";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store.js";
import UserIcon from "./user/UserIcon";
/**
 * Générer l'arborescence des catégories
 */

export default function Nav() {
  const dispatch=useDispatch()
  const user = useSelector((state: RootState) => state.user.user);

  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [arbo, setArbo] = useState<Category[]>([]);

  useEffect(() => {
    (async () => {
      const categories = await getCategories();
      setArbo(categories);
    })();
  }, []);

  const structured = transformCategories(arbo);

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="md:w-[10%]">
        <Image
          src={"/logo.png"}
          alt={"logo"}
          width={200}
          height={200}
          priority
        />
      </div>

      {/* <div className="flex gap-5 p-2 mx-5">
        <Link href="/products">Produits</Link>
        <Link href="/categories">Catégories</Link>
        <Link href="/orders">Commandes</Link>
        <Link href="/invoices">Factures</Link>
        <Link href="/carts">Paniers</Link>
        <Link href="/users">Utilisateurs</Link>

        
      </div> */}
      <div className="border w-[90%] flex items-center justify-between">
        <ul className="flex gap-5 ml-5 mr-5">
          <li className="relative p-2">
            <Link href="/">Home</Link>
          </li>

          <li className="relative p-2">
            <Link href="/products">Produits</Link>
          </li>

          {/* Le conteneur du dropdown */}
          <li
            className="relative p-2"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <Link href="/categories">
              <span className="cursor-pointer">Catégories</span>
            </Link>

            {/* Dropdown principal */}
            {isDropdownOpen && (
              <ul className="absolute left-0 mt-2 w-48 bg-white border rounded shadow z-50">
                {structured.map((cat) => (
                  <li key={cat.id} className="relative group capitalize">
                    <Link
                      href={`/categories/${cat.slug}`}
                      className="block px-4 py-2 hover:bg-gray-100 text-black capitalize"
                    >
                      {cat.name}
                    </Link>

                    {/* Sous-catégories */}
                    {cat.children && cat.children.length > 0 && (
                      <ul className="absolute left-full top-0 hidden group-hover:block bg-white w-48 border rounded shadow z-50">
                        {cat.children.map((child) => (
                          <li key={child.id}>
                            <Link
                              href={`/categories/${cat.name}/${child.name}`}
                              className="block px-4 py-2 hover:bg-gray-100 text-black"
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li className="relative p-2">
            <Link href="/orders">Commandes</Link>
          </li>
        </ul>

        <ul className="flex gap-5 ml-5 mr-5">
          {user.role == "admin" ||
            (user.role == "customer" && (
              <li className="relative p-2">
                <Link href="/dashboard">Compte Client</Link>
              </li>
            ))}

          <li className="flex items-center justify-center p-2">
            <CartIcon />
          </li>

          {user.role == "" && (
          <li className="flex items-center justify-center p-2">
            <Link href="/admin" title="Se connecter">
              <MdLogin size={30} />
            </Link>
          </li>)}

         

          <li className="relative p-2">
            <ThemeToggle />
          </li>

          {user.role && (
          <li className="relative p-2">
            <UserIcon/>
          </li>)}
        </ul>
      </div>
    </div>
  );
}
