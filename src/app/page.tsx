"use client"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import HamburgerMenu from "@/components/Navbar"
import { usePostInfo } from "@/utils/hooks/usePostInformation"

export default function Home() {
  const { data: postData, isPending, isFetched } = usePostInfo()

  console.log(postData)

  const pending = () => {
    if (isPending) {
      return <div>loading...</div>
    }
  }

  return (
    <div className="z-10 w-full h-full lg:flex ">
      <HamburgerMenu />

      <MaxWidthWrapper>
        {isPending ? (
          pending()
        ) : (
          <div className="w-full h-full bg-white">
            {postData?.data.map((post, index) => (
              <div key={index} className="w-full h-full">
                {post.huntingParty}
              </div>
            ))}
          </div>
        )}
      </MaxWidthWrapper>
    </div>
  )
}
