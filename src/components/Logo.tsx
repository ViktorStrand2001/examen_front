"use client"
import { FC } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  classNameImg?: string
  classNameText?: string
  classNameFristT?: string
  classNameSecondT?: string
}

const logo: FC<LogoProps> = ({classNameImg, classNameText, classNameFristT, classNameSecondT}) => {
  return (
    <div className="flex">
      <div className="flex items-center">
        <Image
          src={"web_icon.svg"}
          alt={"logo"}
          width={60}
          height={50}
          className={cn(classNameImg)}
        />
        <p className={cn("font-semibold text-2xl", classNameText)}>
          <span className={cn("text-primaryBige", classNameFristT)}>T</span>eam
          <span className={cn("text-primaryBige", classNameSecondT)}>T</span>
          racker
        </p>
      </div>
    </div>
  )
}

export default logo
