import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store.js";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
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
  /***
   *          _           _
   *         | |         | |
   *       __| | ___  ___| | __ _ _ __ ___
   *      / _` |/ _ \/ __| |/ _` | '__/ _ \
   *     | (_| |  __/ (__| | (_| | | |  __/
   *      \__,_|\___|\___|_|\__,_|_|  \___|
   *
   *
   */
  const router = useRouter();
  const pathname = usePathname();

  const user = useSelector((state: RootState) => state.user.user);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  if (!user) {
    return;
  }

  /***
   *       __                  _   _
   *      / _|                | | (_)
   *     | |_ _   _ _ __   ___| |_ _  ___  _ __  ___
   *     |  _| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
   *     | | | |_| | | | | (__| |_| | (_) | | | \__ \
   *     |_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|___/
   *
   *
   */
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

  /***
   *                           __  __          _
   *                          / _|/ _|        | |
   *      _   _ ___  ___  ___| |_| |_ ___  ___| |_ ___
   *     | | | / __|/ _ \/ _ \  _|  _/ _ \/ __| __/ __|
   *     | |_| \__ \  __/  __/ | | ||  __/ (__| |_\__ \
   *      \__,_|___/\___|\___|_| |_| \___|\___|\__|___/
   *
   *
   */
  useEffect(() => {
    const checkCookies = async () => {
      const res = await fetch("/api/check-cookies");
      const data = await res.json();
      if (data.clearRedux) {
        console.log(data.clearRedux, "destroy redux");
        dispatch(clearUser());
        router.push("/");
      }
    };

    checkCookies();
  }, [pathname]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px : seuil de mobile
    };

    checkIfMobile(); // Initial check
    window.addEventListener("resize", checkIfMobile); // Update on resize

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    if (!isMobile || !isHovered) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setIsHovered(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, isHovered]);

  /***
   *          _ _           _
   *         | (_)         | |
   *       __| |_ ___ _ __ | | __ _ _   _
   *      / _` | / __| '_ \| |/ _` | | | |
   *     | (_| | \__ \ |_) | | (_| | |_| |
   *      \__,_|_|___/ .__/|_|\__,_|\__, |
   *                 | |             __/ |
   *                 |_|            |___/
   */

  return (
    <div
      className="flex flex-row cursor-pointer z-10"
      title="Accéder au panier"
      onMouseEnter={!isMobile ? handleMouseEnter : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
      onClick={isMobile ? () => setIsHovered((prev) => !prev) : undefined}
    >
      <div className="relative transition-all p-2">
        <IoMdPerson size="28" title={user.role} />

        {isHovered && (
          <AnimatePresence>
            <motion.div
              ref={userRef}
              key="dropdown"
              initial={{ opacity: 0, y: 0, x: 0, scale: 0 }}
              animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, x: 200, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bg-[var(--background)] m-5 z-10 top-[2rem] left-[-200%] md:right-0 min-w-50 md:min-h-100 md:max-h-500 border transition-all p-5 flex flex-col items-center md:justify-between md:gap-5 md:origin-top-right"
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

                <div className="flex flex-col">
                  {user.role == "admin" && pathname != "/admin" && (
                    <CustomedLink title="Gérer le site" url="/admin" />
                  )}
                  {user.role != "" && (
                    <CustomedLink title="Mon profil" url="/user/profile" />
                  )}
                </div>
              </div>

              <div>
                <CustomedButton
                  type={"primary"}
                  onClick={() => handleToLogout()}
                >
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
