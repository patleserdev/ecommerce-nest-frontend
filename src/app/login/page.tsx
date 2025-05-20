"use client"; // si dans app/ avec React Server Components

import { loginUser } from "@/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await loginUser(email, password);

      if (!res.ok) {
        throw new Error("Email ou mot de passe incorrect");
      }

      console.log("Connexion réussie");
      router.push("/admin");

      // Ici, redirige l'utilisateur ou update le state global si tu utilises un contexte
    } catch (err: any) {
      console.log(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto p-4 border rounded"
    >
      <h2 className="text-xl font-bold mb-4">Se connecter</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>
      )}

      <label className="block mb-2">
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded mt-1"
          placeholder="exemple@domaine.com"
        />
      </label>

      <label className="block mb-4">
        Mot de passe
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded mt-1"
          placeholder="Votre mot de passe"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}
