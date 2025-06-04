import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store.js";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useState, useRef } from "react";
import Image from "next/image.js";
import { MdAddBox, MdIndeterminateCheckBox } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { clearUser } from "@/redux/reducers/userSlice";
import Link from "next/link.js";
import CustomedButton from "../CustomedButton";
import { AnimatePresence, motion } from "framer-motion";
import { logout } from "@/lib/api";
import { useRouter, usePathname } from "next/navigation.js";
import { toFirstLetterUpper } from "../../lib/utils";
import CustomedLink from "../CustomedLink";
export default function UserIcon() {
  const router = useRouter();
  const pathname = usePathname();

  const user = useSelector((state: RootState) => state.user.user);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 300); // délai de fermeture douce
  };

  const handleToLogout = async () => {
    const valid = confirm("Etes-vous sûr de vouloir vous déconnecter ?");
    if (valid) {
      const response = await logout();
      dispatch(clearUser());
      if (response) {
        router.push("/");
      }
    }
  };

  return (
    <div
      className="flex flex-row cursor-pointer z-10"
      title="Accéder au panier"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative transition-all p-2">
        <IoMdPerson size="28" title={user.role} />

        {isHovered && (
          <AnimatePresence>
            <motion.div
              key="dropdown"
              initial={{ opacity: 0, y: 0, x: 0, scale: 0 }}
              animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, x: 200, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bg-[var(--background)] m-5 z-10 top-[2rem] right-0 min-w-50 min-h-100 max-h-500 border transition-all p-5 flex flex-col items-center justify-between gap-5 origin-top-right"
            >
              <div>
                <div>
                  <h2 className="text-lg mb-2">
                    Bienvenue
                    <span className="ml-1 font-bold">
                      {toFirstLetterUpper(user.username)}
                    </span>
                  </h2>
                  <hr />
                </div>

                {user.role == "admin" && pathname != "/admin" && (
                  <CustomedLink title="Gérer le site" url="/admin" />
                )}

                {user.role != "" && (
                   <CustomedLink title="Mon profil" url="/user/profile" />
              
                )}
              </div>

              <div>
                <CustomedButton onClick={() => handleToLogout()}>
                  Se déconnecter
                </CustomedButton>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
