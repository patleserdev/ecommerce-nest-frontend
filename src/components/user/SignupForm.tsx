"use client";

import { loginUser } from "@/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import CustomedButton from "../CustomedButton";
import { signupUser } from "@/lib/api";

export default function SignupForm() {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      // Ici, on simule une inscription avec loginUser. Remplace si tu as une vraie fonction `signupUser`
      const res = await signupUser(email,username, password);

      if (!res.ok) {
        throw new Error("Email ou mot de passe incorrect");
      }

      console.log("Inscription réussie");
      const res2=await loginUser(email,password,dispatch)

      if (!res2.ok) {
        throw new Error("Erreur lors de la connexion");
      }
      router.push("/dashboard");

    } catch (err: any) {
      console.log(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-5">
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded">{error}</div>
        )}

        <label className="block">
          Nom d'utilisateur
          <input
            type="text"
            name="username"
            required
            className="w-full border px-3 py-2 rounded mt-1"
            placeholder="exemple user"
          />
        </label>

        <label className="block">
          Email
          <input
            type="email"
            name="email"
            required
            className="w-full border px-3 py-2 rounded mt-1"
            placeholder="exemple@domaine.com"
          />
        </label>

        <label className="block">
          Mot de passe
          <input
            type="password"
            name="password"
            required
            className="w-full border px-3 py-2 rounded mt-1"
            placeholder="Votre mot de passe"
          />
        </label>

        <CustomedButton type="submit" disabled={loading}>
          {loading ? "Inscription en cours..." : "S'inscrire"}
        </CustomedButton>
      </div>
    </form>
  );
}
