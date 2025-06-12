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
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

export default function Navbar() {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [arbo, setArbo] = useState<Category[]>([]);

  useEffect(() => {
    (async () => {
      const categories = await getCategories();
      // console.log(categories)
      setArbo(categories);
    })();
  }, []);

  const structured = transformCategories(arbo);

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)] flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white">
      {/* Logo */}
      <div className="md:w-[50%]">
        <Image
          src={"/logo.png"}
          alt={"logo"}
          width={200}
          height={200}
          priority
        />
      </div>
      <h1 className="w-full text-3xl font-bold text-[#00df9a]">OEB.</h1>

      {/* Desktop Navigation */}
      <div className="hidden md:flex border w-[90%] text-[var(--foreground)] items-center justify-between">
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
        </ul>

        <ul className="flex gap-5 ml-5 mr-5">
          <li className="flex items-center justify-center p-2">
            <CartIcon />
          </li>

          {!user && (
            <li className="flex items-center justify-center p-2">
              <Link href="/login" title="Se connecter">
                <MdLogin size={30} />
              </Link>
            </li>
          )}

          <li className="relative p-2">
            <ThemeToggle />
          </li>

          {user && user.role && (
            <li className="relative p-2">
              <UserIcon />
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Navigation Icon */}
      <div
        onClick={handleNav}
        className="block md:hidden text-[var(--foreground)]"
      >
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? "fixed md:hidden left-0 top-0 w-[85%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 z-50"
            : "ease-in-out w-[90%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        <div className="md:w-[50%] items-center justify-center flex flex-row mt-2 mb-5">
          <Image
            src={"/logo.png"}
            alt={"logo"}
            width={100}
            height={100}
            priority
          />
          <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">OEB.</h1>
        </div>
        {/* Mobile Logo */}

        {/* Mobile Navigation Items */}
        <ul className="flex flex-row flex-wrap gap-1 items-center justify-center">
          <li className="flex items-center justify-start p-2">
            <CartIcon />
          </li>

          {!user && (
            <li className="flex items-center justify-start p-2">
              <Link href="/login" title="Se connecter">
                <MdLogin size={30} />
              </Link>
            </li>
          )}

          {user && user.role && (
            <li className="relative p-2 flex items-center justify-start p-2">
              <UserIcon />
            </li>
          )}
          <li className="relative p-2 flex items-center justify-start p-2">
            <ThemeToggle />
          </li>
        </ul>

        <ul className="flex flex-col justify-center items-center text-xl gap-5 ">
          <li className="relative p-2 w-30">
            <Link href="/">Home</Link>
          </li>

          <li className="relative p-2 w-30">
            <Link href="/products">Produits</Link>
          </li>

          {/* Le conteneur du dropdown */}
          <li
            className="relative p-2 w-30"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <Link href="/categories">
              <span className="cursor-pointer">Catégories</span>
            </Link>

            {/* Dropdown principal */}
            {/* {isDropdownOpen && (
              <ul className="absolute left-0 mt-2 w-48 bg-white border rounded shadow z-50">
                {structured.map((cat) => (
                  <li key={cat.id} className="relative group capitalize">
                    <Link
                      href={`/categories/${cat.slug}`}
                      className="block px-4 py-2 hover:bg-gray-100 text-black capitalize"
                    >
                      {cat.name}
                    </Link> */}

            {/* Sous-catégories */}
            {/* {cat.children && cat.children.length > 0 && (
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
                    )} */}
            {/* </li>
                ))}
              </ul>
            )} */}
          </li>
        </ul>
      </ul>
    </div>
  );
}
