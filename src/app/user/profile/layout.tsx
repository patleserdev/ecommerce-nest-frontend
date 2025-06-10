"use client"
import Link from "next/link.js"
import React from 'react'
import { usePathname } from "next/navigation.js"
import { profileLinks } from "@/Constants"
export default function ProfileLayout({ children }: { children: React.ReactNode }) {

  const pathname= usePathname()
  console.log(pathname)
  const activeStyle=" text-[var(--background)] bg-[var(--foreground)] text-lg border py-2 text-center px-2 md:px-0"
  const inactiveStyle="text-lg border py-2 text-center px-2 md:px-0"

    return (

      <div className="p-4 text-[var(--foreground)] bg-[var(--background)]">
        <h1 className="text-3xl mb-5">Mon profil</h1>
        <div className="flex flex-col md:flex-row gap-5">
          <aside className="w-full md:w-[15%] flex flex-wrap md:flex-col gap-5">
            {/* Sidebar */}
            {profileLinks.map((link,i) =>  <Link key={i} className={`${pathname == link.url ? activeStyle : inactiveStyle }`} href={link.url}>{link.label}</Link> )}
            {/* <aside className="w-[25%] flex flex-col items-start gap-5">
          <div className="border p-2">Mes informations personelles</div>
          <div className="border p-2">Mes adresses</div>
          <div className="border p-2">Mes commandes</div>
          <div className="border p-2">Mes favoris</div>
          <div className="border p-2">
            <ul className="list-disc">
              Préférences
              <li className="mx-5">abonnement newsletter</li>
              <li className="mx-5">notification</li>
              <li className="mx-5">langue devise par défaut</li>
              <li className="mx-5">consentement rgpd</li>
            </ul>
          </div>
          <div className="border p-2">
            <ul className="list-disc">
              SAV / retours
              <li className="mx-5">demande en cours,</li>
              <li className="mx-5">historique des demandes</li>
              <li className="mx-5">télécharger etiquette retour</li>
              <li className="mx-5">support</li>
            </ul>
          </div>
          <div className="border p-2">
            Mes factures (téléchargement des factures)
          </div>
        </aside> */}
          </aside>
          <div className="w-full md:w-[85%] border p-2 md:p-0">{children}</div>
        </div>
      </div>
    )
  }
  