"use client";

import { useState } from "react";
import { IoCaretForwardOutline } from "react-icons/io5";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link.js";
import CustomedLink from "../CustomedLink";
type LoginFormHandlerProps = {
  redirectTo?: string; // facultatif
};

export default function LoginFormHandler({
  redirectTo,
}: LoginFormHandlerProps) {
  const [isSignup, setIsSignUp] = useState(false);

  const variants = {
    initial: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      rotateY: direction > 0 ? 90 : -90,
    }),
    animate: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      transition: { duration: 0.5 },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      rotateY: direction < 0 ? 90 : -90,
      transition: { duration: 0.5 },
    }),
  };

  const direction = isSignup ? 1 : -1;

  return (
    <div className="max-w-sm mx-auto p-8 pb-8 border rounded shadow-lg min-h-120 w-100 relative overflow-hidden">
      <div className={`flex justify-end mb-6 select-none`}>
        <h2>
          <button
            onClick={() => setIsSignUp(!isSignup)}
            className={`text-xl font-bold flex items-center cursor-pointer transition-opacity opacity-30`}
          >
            {isSignup ? "Se connecter" : "S'inscrire"}
            <IoCaretForwardOutline />
          </button>
        </h2>
      </div>

      <div className="flex items-center justify-center mb-4 select-none">
        <h1 className="text-2xl font-bold">
          {!isSignup ? "Connexion" : "Inscription"}
        </h1>
      </div>

      <div className="relative min-h-100">
        <AnimatePresence custom={direction} mode="wait">
          {isSignup ? (
            <motion.div
              key="signup"
              custom={direction}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute w-full"
            >
              <SignupForm />
            </motion.div>
          ) : (
            <motion.div
              key="login"
              custom={direction}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute w-full flex flex-col gap-2"
            >
              <div>
                <LoginForm redirectTo={redirectTo} />
              </div>

              <div className="flex flex-row justify-center text-md">
                <CustomedLink url="/forgot-password" title={"Mot de passe oublié ?"}/>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
