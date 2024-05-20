"use client"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import HamburgerMenu from "@/components/Navbar"
import { idToken } from "@/lib/authToken"
import { jwtDecode } from "jwt-decode"
import { EditIcon, UserCheck } from "lucide-react"
import { NextPage } from "next"
import { useEffect, useState } from "react"

interface Props {}

const Page: NextPage<Props> = ({ }) => {
  const [user, setUser] = useState<string>()
  
  

  return (
    <div className="w-full h-full">
      <HamburgerMenu />
      <MaxWidthWrapper>
        <div></div>
      </MaxWidthWrapper>
    </div>
  )
}

export default Page
