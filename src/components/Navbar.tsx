"use client"
import { FC, useState } from "react"
import MaxWidthWrapper from "./MaxWidthWrapper"
import {
  CircleUser,
  CircleUserIcon,
  HeadsetIcon,
  HelpCircleIcon,
  HomeIcon,
  LogIn,
  LogOutIcon,
  Menu,
  MessageCircleIcon,
  PlusSquareIcon,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Logo from "./Logo"

const HamburgerMenu: FC = ({}) => {
  const [isOpen, setIsOpen] = useState(false)
  const tokenExists =
    typeof localStorage !== "undefined" && localStorage.getItem("token")
  const [, updateState] = useState({})

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?")

    if (confirmLogout) {
      const forceUpdate = () => updateState({})
      localStorage.removeItem("token")
      localStorage.removeItem("username")
      localStorage.removeItem("guest")
      console.log(localStorage)
      forceUpdate()
    }
  }

  return (
    <div className="w-full h-20 lg:w-80 lg:h-screen lg:flex bg-primaryGreen border-r border-black">
      <MaxWidthWrapper className="h-full flex items-center lg:items-start">
        <div className="relative w-full flex items-center">
          <div className="lg:flex flex-col lg:h-screen lg:mt-2.5">
            <Logo />
            <div className="hidden lg:flex h-full mt-14 pl-6 text-white">
              <nav className="flex flex-col space-y-10 reletive">
                <Link
                  className="flex items-center flex-row space-x-2 text-primaryBige"
                  href={"http://localhost:3000/home"}
                >
                  <HomeIcon size={30} />
                  <p className="ml-2">Home</p>
                </Link>
                <Link
                  className="flex items-center flex-row space-x-2 text-primaryBige "
                  href={"http://localhost:3000/message"}
                >
                  <MessageCircleIcon size={30} />
                  <p className="ml-2">Messages</p>
                </Link>
                <Link
                  className="flex items-center flex-row space-x-2 text-primaryBige "
                  href={"http://localhost:3000/createPost"}
                >
                  <PlusSquareIcon size={30} />
                  <p className="ml-2">Post</p>
                </Link>
                {!tokenExists ? (
                  <>
                    <Link
                      className="flex flex-row items-center space-x-2 text-primaryBige "
                      href={"http://localhost:3000/"}
                    >
                      <LogOutIcon size={30} />
                      <p className="ml-2">Login</p>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      className="flex flex-row items-center space-x-2 text-primaryBige "
                      href={"http://localhost:3000/profile"}
                    >
                      <CircleUserIcon size={30} />
                      <p className="ml-2">Profile</p>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex flex-row items-center space-x-2 text-primaryBige "
                    >
                      <LogIn size={30} />
                      <p className="ml-2">Logout</p>
                    </button>
                  </>
                )}

                <div className="absolute bottom-10">
                  <Link
                    className="flex flex-row items-center space-x-2 bottom-10 text-primaryBige "
                    href={"http://localhost:3000/support"}
                  >
                    <HeadsetIcon size={30} />
                    <p className="ml-2">Support</p>
                  </Link>
                  <Link
                    className="flex flex-row items-center space-x-2 absolute bottom-10 text-primaryBige "
                    href={"http://localhost:3000/about"}
                  >
                    <HelpCircleIcon size={30} />
                    <p className="ml-2">About</p>
                  </Link>
                </div>
              </nav>
            </div>
          </div>
          <div className="absolute right-0 lg:hidden">
            <div className="flex items-center space-x-4 text-white ">
              {tokenExists ? (
                <>
                  <Link href={"http://localhost:3000/profile"}>
                    <CircleUser size={30} className="text-primaryBige " />
                  </Link>
                </>
              ) : (
                <>
                  <Link href={"http://localhost:3000/"}>
                    <p className="text-primaryBige ">Login</p>
                  </Link>
                </>
              )}

              <div className="flex items-center">
                <button
                  className={cn(
                    " text-primaryBige",
                    isOpen ? "hidden" : "block"
                  )}
                  onClick={() => setIsOpen(true)}
                >
                  <Menu size={35} />
                </button>
                <button
                  className={cn(
                    " text-primaryBige",
                    !isOpen ? "hidden" : "block"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <X size={35} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
      {isOpen ? (
        <>
          <div className="w-full h-[200px] bg-primaryGreen opacity-90 text-primaryBige absolute z-50">
            <div className="flex justify-center items-center h-full">
              <nav className="grid grid-cols-3 gap-10 justify-center items-center ">
                <Link
                  className="flex items-center "
                  href={"http://localhost:3000/home"}
                >
                  <HomeIcon size={30} />
                  <p className="ml-2">Home</p>
                </Link>
                <Link
                  className="flex items-center "
                  href={"http://localhost:3000/message"}
                >
                  <MessageCircleIcon size={30} />
                  <p className="ml-2">Messages</p>
                </Link>
                <Link
                  href={"http://localhost:3000/createPost"}
                  className="flex items-center "
                >
                  <PlusSquareIcon size={30} />
                  <p className="ml-2">Post</p>
                </Link>
                {!tokenExists ? (
                  <>
                    <Link
                      href={"http://localhost:3000/login"}
                      className="flex items-center "
                    >
                      <LogOutIcon size={30} />
                      <p className="ml-2">Login</p>
                    </Link>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleLogout}
                      className="flex items-center "
                    >
                      <LogIn size={30} />
                      <p className="ml-2">Logout</p>
                    </button>
                  </>
                )}
                <Link
                  href={"http://localhost:3000/support"}
                  className="flex items-center  "
                >
                  <HeadsetIcon size={30} />
                  <p className="ml-2">Support</p>
                </Link>
                <Link
                  href={"http://localhost:3000/about"}
                  className="flex items-center "
                >
                  <HelpCircleIcon size={30} />
                  <p className="ml-2">About</p>
                </Link>
              </nav>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default HamburgerMenu
