"use client";

import { loginUser } from "@/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import CustomedButton from "../CustomedButton";

export default function LoginForm() {
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
    const password = formData.get("password") as string;

    try {
      const res = await loginUser(email, password, dispatch);

      if (!res.ok) {
        throw new Error("Email ou mot de passe incorrect");
      }

      console.log("Connexion réussie");
      router.push("/admin");
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
          {loading ? "Connexion..." : "Se connecter"}
        </CustomedButton>
      </div>
    </form>
  );
}
