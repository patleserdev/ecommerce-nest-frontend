import Link from "next/link.js"

interface InterfaceCustomedLink{
    title: string;
    url: string;
}
export default function CustomedLink({title,url}:InterfaceCustomedLink){
    return (
        <Link className="border w-full text-center px-8 p-2 mt-2 mb-2 bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--background)] hover:text-[var(--foreground)] cursor-pointer" href={url}>{title}</Link>
    )
}