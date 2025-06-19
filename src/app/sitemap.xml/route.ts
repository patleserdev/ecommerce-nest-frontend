// app/sitemap.xml/route.ts

import { NextResponse } from "next/server";
import { getCategories, getProducts } from "@/lib/api";

const SITE_URL = "https://www.tonsite.com"; // Remplace par ton domaine réel

export async function GET() {
  const products = await getProducts();
  const categories = await getCategories();

  // Génère les URLs pour les produits
  const productUrls = products
    .map(
      (product) => `
    <url>
      <loc>${SITE_URL}/products/${product.slug}</loc>
    </url>`
    )
    .join("");

  // Génère les URLs pour les catégories
  const categoryUrls = categories
    .map(
      (categorie) => `
    <url>
      <loc>${SITE_URL}/categories/${categorie.slug}</loc>
    </url>`
    )
    .join("");

  // XML final
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${categoryUrls}
${productUrls}
</urlset>`;

  return new NextResponse(sitemap.trim(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
