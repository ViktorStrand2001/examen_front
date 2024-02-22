import { FC } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  classNameImg?: string
  classNameText?: string
}

const logo: FC<LogoProps> = ({classNameImg, classNameText}) => {
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
        <p className={cn("font-bold text-2xl", classNameText)}>
          <span className="text-green-900">T</span>eam
          <span className="text-amber-950">T</span>racker
        </p>
      </div>
    </div>
  )
}

export default logo
