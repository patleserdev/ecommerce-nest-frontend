// app/not-found.tsx
import Image from "next/image.js";
import Link from "next/link.js";
export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-5">
        <Image src={"/notfound.png"} alt="not found" width={300} height={500}/>
        <h1 className="text-4xl font-bold mb-4">404 - Page non trouvée</h1>
        <p className="mb-6">Désolé mais la page que vous recherchez n'existe pas.</p>

        <Link className="text-blue-500 underline hover:text-blue-800 transition-all text-lg" href="/">Retour à la page principale</Link>
    
      </div>
    );
  }
  