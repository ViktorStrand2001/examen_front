"use client"
import Login from "@/components/LoginForm"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"

export default function Home() {
  return (
    <div className="reletive h-screen bg-moose-hero bg-fixed bg-center bg-cover bg-no-repeat z-50">
      <MaxWidthWrapper>
        <Login />
      </MaxWidthWrapper>
    </div>
  )
}
