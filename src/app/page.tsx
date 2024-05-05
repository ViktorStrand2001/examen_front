"use client"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import HamburgerMenu from "@/components/Navbar"
import { useState, useEffect } from "react"

export default function Home() {
  const [token, setToken] = useState<any>()

  // Use useEffect to retrieve token from localStorage when component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token")
      setToken(storedToken)
    }
  }, []) // Empty dependency array to run the effect only once when component mounts

  return (
    <div className="z-10 bg-gray-200 w-full h-full lg:flex ">
      <HamburgerMenu />
      <MaxWidthWrapper>
        <div className="">
          <p>{token}</p>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}
