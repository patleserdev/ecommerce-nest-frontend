"use client"
import Image from "next/image.js"
import { useTheme } from 'next-themes'
export default function DisplayIcon({icon,size = 50}:{icon:string,size?:number}){
    const { theme, setTheme } = useTheme()

    return (
        <Image
        src={icon}
        alt="logo"
        width={size}
        height={size}
        style={theme == "dark" ? { filter: "invert(1)" } : {}}
      />

    )
}