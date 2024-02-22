"use client"
import Image from "next/image"
import { FC, useState } from "react"
import MaxWidthWrapper from "./MaxWidthWrapper"
import {
  CircleUser,
  LogIn,
  LogOut,
  Menu,
  Settings,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface HamburgerMenuProps {}

const HamburgerMenu: FC<HamburgerMenuProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLogin, setIsLogim] = useState(false)
  const tokenExists = !!localStorage.getItem("token")

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    console.log(localStorage)
  }

  return (
    <div className="min-w-full min-h-20 overflow-hidden">
      <div className="bg-gradient-to-r from-green-700 to-[#593a0e]">
        <MaxWidthWrapper>
          <div className="flex items-center h-20 relative">
            <Image src={"web_icon.svg"} alt={"logo"} width={60} height={50} />
            <p className="text-xl font-bold">TeamTracker</p>
            <div className="absolute right-0">
              <div className="flex items-center overflow-hidden space-x-4">
                <button onClick={() => setIsOpen(!isOpen)}>
                  <CircleUser size={30} className="text-white" />
                </button>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={cn("text-white", isOpen ? "hidden" : "block")}
                >
                  <Menu size={40} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className={cn("text-white", !isOpen ? "hidden" : "block")}
                >
                  <X size={40} />
                </button>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
      {isOpen ? (
        <div className="bg-white p-4 absolute min-w-full">
          <div className="flex flex-col space-y-4">
            <div className="flex">
              <button className="flex items-center">
                <Settings size={30} />
                <span className="ml-2">Profile Settings</span>
              </button>
            </div>
            <div className="flex">
              {tokenExists ? (
                <button className="flex items-center" onClick={handleLogout}>
                  <LogOut size={30} />
                  <span className="ml-2">Logout</span>
                </button>
              ) : (
                <Link
                  className="flex items-center"
                  href={"http://localhost:3000/login"}
                >
                  <LogIn size={30} />
                  <span className="ml-2">Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default HamburgerMenu
