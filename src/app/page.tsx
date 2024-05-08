"use client"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import HamburgerMenu from "@/components/Navbar"
import { usePostInfo } from "@/utils/hooks/usePostInformation"
import { useEffect } from "react"

export default function Home() {
  const { data: postData, isPending } = usePostInfo()

  const formatDate = (dateString: any) => {
    const date = new Date(dateString)
    return date.toISOString().split("T")[0]
  }

  useEffect(() => {
      console.log(postData)
  }, [postData])

  

  const pending = () => {
    if (isPending) {
      return <div>loading...</div>
    }
  }
  return (
    <div className="z-10 w-full h-full lg:flex">
      <HamburgerMenu />

      <MaxWidthWrapper>
        {isPending ? (
          pending()
        ) : (
          <div className="w-full bg-white mt-5">
            {postData?.data.map((post, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-md p-4 mb-4"
              >
                <div className="flex items-center mb-2 relative">
                  <div className="font-bold mr-2">{post.user.username}</div>
                  <div className="absolute right-0">{post.huntingParty}</div>
                </div>
                <div className="mb-2">{post.content}</div>
                <div className="flex text-sm">
                  <div className="mr-4">{post.phoneNumber}</div>
                </div>
                <div className="flex text-sm relative">
                  <div className="mr-4">{post.email}</div>
                  <div className="text-gray-500 text-sm absolute right-0">
                    {formatDate(post.published)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </MaxWidthWrapper>
    </div>
  )
}
