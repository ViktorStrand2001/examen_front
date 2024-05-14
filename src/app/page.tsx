"use client"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import HamburgerMenu from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { usePostInfo } from "@/utils/hooks/usePostInformation"
import { EllipsisIcon, HeartIcon, ImageIcon, MapPinnedIcon, MessageCircle, Share, Share2Icon, UserCircleIcon } from "lucide-react"
import Image from "next/image"
import React, { useState } from "react"
import { useEffect } from "react"

export default function Home() {
  const { data: postData, isPending } = usePostInfo()
  const [liked, setLiked] = useState<any>()

  const formatDate = (dateString: any) => {
    const date = new Date(dateString)
    return date.toISOString().split("T")[0]
  }

  useEffect(() => {
    console.log(postData)
  }, [postData])

  const sortPosts = postData?.data.sort((a, b) => {
    if (a.published && b.published) {
      return new Date(b.published).getTime() - new Date(a.published).getTime()
    }
    return 0
  })

  const renderPostContent = (content: string) => {
    return content.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line} <br />
      </React.Fragment>
    ))
  }

  useEffect(() => {
    console.log(sortPosts)
  }, [sortPosts])

  const pending = () => {
    if (isPending) {
      return <div>loading...</div>
    }
  }
  return (
    <div className="z-10 w-full h-full lg:flex ">
      <div className="lg:fixed">
        <HamburgerMenu />
      </div>

      <MaxWidthWrapper>
        {isPending ? (
          pending()
        ) : (
          <div className="w-full h-full lg:flex lg:flex-col lg:items-center">
            {postData?.data.map((post, index) => (
              <div
                key={index}
                className="p-4 mb-4 text-primaryBige lg:w-[600px] break-all"
              >
                <div className="flex items-center mb-2 relative">
                  <Button className="bg-transparent hover:bg-transparent">
                    <UserCircleIcon size={40} className="text-primaryBige" />
                  </Button>

                  <div className="font-bold mr-2">{post.user.username}</div>
                  <div className="text-sm opacity-80">{post.huntingParty}</div>
                  <Button className="absolute right-0 bg-transparent hover:bg-transparent">
                    <EllipsisIcon
                      size={30}
                      className="z-10 hover:w-12 hover:h-12 w-12"
                    />
                  </Button>
                </div>
                <div className="flex justify-center items-center">
                  <ImageIcon size={400} className="" />
                </div>

                <div className="flex items-center mb-2 relative space-x-3 h-10">
                  {!liked ? (
                    <>
                      <button
                        className="bg-transparent hover:bg-transparent w-12"
                        onClick={() => setLiked(!liked)}
                      >
                        <HeartIcon size={40} className="text-primaryBige" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="bg-transparent hover:bg-transparent w-12"
                        onClick={() => setLiked(!liked)}
                      >
                        <Image
                          src={"/icons/Heart.svg"}
                          alt="Allowed games"
                          width={45}
                          height={45}
                          className="text-primaryBige"
                        />
                      </button>
                    </>
                  )}

                  <button className="bg-transparent hover:bg-transparent">
                    <MessageCircle size={40} className="text-primaryBige" />
                  </button>
                  <button className="bg-transparent hover:bg-transparent">
                    <Share2Icon size={40} className="text-primaryBige" />
                  </button>
                  <button className="bg-transparent hover:bg-transparent absolute right-0">
                    <MapPinnedIcon size={40} className="text-primaryBige" />
                  </button>
                  <button className="bg-transparent hover:bg-transparent absolute right-7">
                    <Image
                      src={"/icons/Target.svg"}
                      alt="Allowed games"
                      width={90}
                      height={90}
                      className="text-primaryBige"
                    />
                  </button>
                </div>
                <div className="mb-2">
                  {renderPostContent(post.content ?? "")}
                </div>
                <div className="flex text-sm">
                  <div className="mr-4">{post.phoneNumber}</div>
                </div>
                <div className="flex text-sm relative">
                  <div className="mr-4">{post.email}</div>
                  <div className="text-sm absolute right-0">
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
