import Link from "next/link.js";

export default function Nav() {
  return (
    <div className="flex gap-5 p-2">
      <Link href="/products">Produits</Link>
      <Link href="/categories">Catégories</Link>
      <Link href="/orders">Commandes</Link>
      <Link href="/invoices">Factures</Link>
      <Link href="/carts">Paniers</Link>
      <Link href="/users">Utilisateurs</Link>
    </div>
  );
}
